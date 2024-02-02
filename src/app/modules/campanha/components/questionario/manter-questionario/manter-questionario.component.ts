import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Inject,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Ask } from '../../../models/ask';
import { Campaign } from '../../../models/campaign';
import { Survey, SurveyRequest } from '../../../models/survey';

@Component({
  selector: 'app-manter-questionario',
  templateUrl: './manter-questionario.component.html',
  styleUrls: ['./manter-questionario.component.scss'],
})
export class ManterQuestionarioComponent implements AfterViewChecked {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';
  simNaoOptions = [
    { label: 'Sim', value: true },
    { label: 'Não', value: false },
  ];
  campanhas: Campaign[] = [];

  form = this.fb.group({
    id: [null],
    name: [null, Validators.required],
    description: [null],
    campaign_id: [null, Validators.required],
    ask_ids: [null],
    is_required: [false],
  });

  perguntasDisponiveis: Ask[] = [];

  perguntasSelecionadas: Ask[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private campanhaService: CampanhaService,
    private router: Router,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.campanhaService
      .getCampaigns()
      .subscribe((campaigns) => (this.campanhas = campaigns));

    if (id) {
      this.isEdicao = true;
      this.acao = 'Editar';
      this.campanhaService
        .getSurveyById(this.activatedRoute.snapshot.paramMap.get('id'))
        .subscribe((survey) => {
          this.form.patchValue(survey);
          this.form.controls['campaign_id'].setValue(survey.campaign.id);

          this.campanhaService.getAsks().subscribe((asks) => {
            asks.forEach((ask) => {
              survey.survey_serialized.forEach((selectedAsk: { id: any }) => {
                if (ask.id == selectedAsk.id) {
                  this.perguntasSelecionadas.push(ask);
                }
              });

              if (!this.perguntasSelecionadas.includes(ask)) {
                this.perguntasDisponiveis.push(ask);
              }
            });
          });
        });
    } else {
      this.isEdicao = false;
      this.campanhaService
        .getAsks()
        .subscribe((asks) => (this.perguntasDisponiveis = asks));
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {}

  onCancela(): void {
    this.router.navigate(['campanha/listar-questionarios']);
  }

  onSubmit() {
    let pergunta_ids: any = this.perguntasSelecionadas.map(
      (pergunta) => pergunta.id
    );
    this.form.controls['ask_ids'].setValue(pergunta_ids);

    if (this.form.valid) {
      let surveyRequest: SurveyRequest = new SurveyRequest();
      surveyRequest.survey = this.form.value;

      if (!this.isEdicao) {
        this.campanhaService.saveSurvey(surveyRequest).subscribe((result) => {
          this.messageService.showSuccessMessage(
            `${interfaceProperties.label.questionario} ${interfaceProperties.mensagem.salvo_com_sucesso}`,
            5000
          );
        });
      } else {
        this.campanhaService.updateSurvey(surveyRequest).subscribe((result) => {
          this.messageService.showSuccessMessage(
            `${interfaceProperties.label.questionario} ${interfaceProperties.mensagem.atualizado_com_sucesso}`,
            5000
          );
        });
      }

      this.router.navigate(['campanha/listar-questionarios']);
    }
  }

  drop(event: CdkDragDrop<Ask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  selecionarPergunta(ask: Ask) {
    this.perguntasSelecionadas.push(ask);
    this.perguntasDisponiveis = this.perguntasDisponiveis.filter(
      (pergunta) => pergunta.id !== ask.id
    );
  }

  cancelarSelecaoPergunta(ask: Ask) {
    this.perguntasDisponiveis.push(ask);
    this.perguntasSelecionadas = this.perguntasSelecionadas.filter(
      (pergunta) => pergunta.id !== ask.id
    );
  }

  selecionarTodasPerguntas() {
    this.perguntasSelecionadas.push(
      ...this.perguntasDisponiveis.filter(
        (disponivel) => !this.perguntasSelecionadas.includes(disponivel)
      )
    );

    this.perguntasDisponiveis = [];
  }

  cancelarSelecaoTodasPerguntas() {
    this.perguntasDisponiveis.push(
      ...this.perguntasSelecionadas.filter(
        (disponivel) => !this.perguntasDisponiveis.includes(disponivel)
      )
    );

    this.perguntasSelecionadas = [];
  }
}
