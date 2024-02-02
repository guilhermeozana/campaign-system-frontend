import { CheckboxAnswer } from './../../models/checkbox-answer';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { Ask } from '../../models/ask';
import { Survey } from '../../models/survey';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatCheckbox, MatCheckboxChange } from '@angular/material/checkbox';
import { Answer, AnswerRequest } from '../../models/answer';
import { CurrentUser } from 'src/app/shared/models/current-user';
import { SurveySerialized } from '../../models/survey_serialized';
import { EditarFormularioComponent } from './editar-formulario/editar-formulario.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent {
  interfaceProperty = interfaceProperties;
  surveys!: Survey[];
  surveySelected: any;
  askSelected: any;
  askNumber: any;
  checkboxAnswer = new CheckboxAnswer();
  answerSavedParams: Answer = new Answer();
  currentUser: CurrentUser = new CurrentUser();
  isFormCompleted = false;
  answersResume!: Answer[];
  answerToBeSavedToFinishForm!: any;
  isEditionFromResume: boolean = false;

  @ViewChild('checkbox') checkbox!: MatCheckbox;

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private campanhaService: CampanhaService,
    private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
    private renderer: Renderer2,
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.campanhaService.getSurveysActive().subscribe((surveys) => {
      this.surveys = surveys;
      this.surveySelected = surveys[0]; //Depois será alterado para ser possível responder mais de um questionário.

      this.askSelected = this.surveySelected.survey_serialized[0];

      this.authService.getCurrentUser().subscribe((user) => {
        this.currentUser = user;
        this.initForm();
      });
    });
  }

  initForm() {
    this.form = this.fb.group({
      survey_id: [this.surveySelected.id],
      ask_id: [this.surveySelected.survey_serialized[0].attributes.id],
      answer_option_id: [null],
      user_id: [this.currentUser.id],
      answer_text: ['', Validators.required],
      ask_number: [1],
    });

    this.checkboxAnswer = new CheckboxAnswer();
  }

  onAlteraRespostaRadio(item: any) {
    this.form.controls['answer_option_id'].setValue(item.id);
    this.form.controls['answer_text'].setValue(item.description);
  }

  onSubmit() {
    this.form.controls['ask_id'].setValue(this.askSelected.id);

    if (this.form.controls['ask_number'].value == this.surveySelected.survey_serialized.length) {

      this.buscarRespostasResumo().add(() => {
        this.form.controls['ask_number'].setValue(Number.MAX_VALUE);
        this.answerToBeSavedToFinishForm = this.form.value;
        this.isFormCompleted = true;
        this.checkboxAnswer = new CheckboxAnswer();
      });

      return;
    }

    return this.campanhaService.saveAnswer(this.form.value).subscribe(() => {
      if (!this.isFormCompleted) {
        this.onProximaPergunta();
      }
    });


  }

  onPerguntaAnterior() {
    let askNumberBefore: any = this.form.controls['ask_number'].value;
    this.form.controls['ask_number'].setValue(askNumberBefore - 1);

    this.askSelected =
      this.surveySelected.survey_serialized[askNumberBefore - 2];
    this.form.patchValue(this.askSelected);

    this.form.controls['answer_option_id'].setValue(null);
    this.form.controls['answer_text'].setValue('');

    this.checkboxAnswer = new CheckboxAnswer();

    this.buscarResposta();
  }

  onPularPergunta() {
    this.form.controls['answer_option_id'].setValue(null);
    this.form.controls['answer_text'].setValue('N/A');

    this.onSubmit();
  }

  onProximaPergunta() {
    let askNumberBefore: any = this.form.controls['ask_number'].value;

    this.form.controls['ask_number'].setValue(askNumberBefore + 1);

    this.askSelected = this.surveySelected.survey_serialized[askNumberBefore];
    this.form.controls['answer_text'].setValue('');

    this.buscarResposta().add(
      () => (this.checkboxAnswer = new CheckboxAnswer())
    );
  }

  buscarResposta() {
    this.answerSavedParams.ask_id = this.askSelected.attributes.id;
    this.answerSavedParams.survey_id = this.surveySelected.id;
    this.answerSavedParams.user_id = this.currentUser.attributes.id;

    return this.campanhaService
      .findAnswers(this.answerSavedParams)
      .subscribe((answers) => {
        if (answers[0]) {
          this.form.patchValue(answers[0]);

          if (this.askSelected.attributes.component_type == 'checkbox' && answers[0].answer_text != 'N/A') {
            this.checkboxAnswer = JSON.parse(answers[0].answer_text);

            this.form.controls['answer_text'].setValue(JSON.stringify(this.checkboxAnswer));
          }
        }
      });
  }

  buscarRespostasResumo() {
    this.answerSavedParams.ask_id = undefined;
    this.answerSavedParams.survey_id = this.surveySelected.id;
    this.answerSavedParams.user_id = this.currentUser.attributes.id;

    return this.campanhaService
      .findAnswers(this.answerSavedParams)
      .subscribe((answers) => {
        this.answersResume = answers;
      });
  }

  obterResposta(ask: any) {
    let answer;

    if (this.answersResume) {
      if (ask.attributes.id == this.answerToBeSavedToFinishForm.ask_id) {
        answer = this.answerToBeSavedToFinishForm.answer_text;
      } else {
        answer = this.answersResume.find(
          (answer) => answer.ask_id == ask.attributes.id
        )?.answer_text;
      }

      if(ask.attributes.component_type == 'checkbox') {
        if (answer && answer == 'N/A') {
          answer = [answer];
        } else {
          answer = JSON.parse(answer).answer_texts;
        }
      }


      return answer;
    }
  }

  excluirRespostas() {
    this.answerSavedParams.ask_id = undefined;
    this.answerSavedParams.survey_id = this.surveySelected.id;
    this.answerSavedParams.user_id = this.currentUser.attributes.id;

    this.campanhaService.deleteAnswers(this.answerSavedParams).subscribe();
  }

  onCheckbox(event: any, answer: any) {
    if (event.checked) {
      this.checkboxAnswer.answer_option_ids.push(answer.id);
      this.checkboxAnswer.answer_texts.push(answer.description);
    } else {
      let index = this.checkboxAnswer.answer_option_ids.indexOf(answer.id);
      this.checkboxAnswer.answer_option_ids.splice(index, 1);
      this.checkboxAnswer.answer_texts.splice(index, 1);
    }

    this.form.controls['answer_text'].setValue(
      this.checkboxAnswer.answer_option_ids.length > 0
        ? JSON.stringify(this.checkboxAnswer)
        : ''
    );
  }

  onConfirmarRespostas() {
    this.form.patchValue(this.answerToBeSavedToFinishForm);

    this.onSubmit()?.add(() => {
      localStorage.removeItem('hasSurveysActive');
      this.messageService.showSuccessMessage(interfaceProperties.mensagem.questionario_finalizado_com_sucesso);

      this.router.navigate(['/home']);
    });
  }

  onRefazerQuestionario() {
    this.answerSavedParams.ask_id = undefined;

    this.buscarRespostasResumo().add(() => {
      if (this.answersResume.length > 0) {
        this.excluirRespostas();
      }
    });

    this.initForm();
    this.isFormCompleted = false;
  }

  onEditarResposta(askId: any, askIndex: any) {
    this.askSelected = this.surveySelected.survey_serialized.find((ask: { id: any }) => ask.id == askId);

    if ( this.askSelected.attributes.id == this.answerToBeSavedToFinishForm.ask_id ) {

      this.form.patchValue(this.answerToBeSavedToFinishForm);

      if(this.askSelected.attributes.component_type == 'checkbox'){
        this.checkboxAnswer = JSON.parse(this.answerToBeSavedToFinishForm.answer_text);
      }

      this.openEditionDialog();

    } else {

      this.form.controls['ask_number'].setValue(askIndex + 1);

      this.buscarResposta().add(() => {
        this.openEditionDialog();
      });

    }
  }

  openEditionDialog() {

    const dialogRef = this.dialog.open(EditarFormularioComponent, {
      data: {
        askSelected: this.askSelected,
        answer: this.form.value,
        checkboxAnswer: this.checkboxAnswer
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {

        if(this.askSelected.attributes.id == this.answerToBeSavedToFinishForm.ask_id) {
          this.answerToBeSavedToFinishForm = result;

        } else {

          this.form.patchValue(result);
          this.onSubmit();
        }

        this.buscarRespostasResumo().add(() => {
          this.isFormCompleted = true;
        });
      }
    });
  }
}
