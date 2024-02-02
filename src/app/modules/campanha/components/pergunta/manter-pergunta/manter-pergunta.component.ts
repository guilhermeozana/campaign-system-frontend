import { Component, Inject, AfterContentChecked, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { Answer } from '../../../models/answer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manter-pergunta',
  templateUrl: './manter-pergunta.component.html',
  styleUrls: ['./manter-pergunta.component.scss']
})
export class ManterPerguntaComponent  {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';
  tipoRespostaOptions = [
    {tipoResposta: 'Resposta curta', component: 'input', icon: 'short_text'},
    {tipoResposta: 'Parágrafo', component: 'textarea', icon: 'notes'},
    {tipoResposta: 'Múltipla escolha', component: 'radio', icon: 'radio_button_checked'},
    {tipoResposta: 'Caixas de seleção', component: 'checkbox', icon: 'check_box'}
  ]

  answers:Answer[] = [];

  form!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private campanhaService: CampanhaService,
    private router: Router,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ManterPerguntaComponent>,
  ) {
    this.inicializarForm();

    if(this.data?.askId){

      this.isEdicao = true;
      this.acao = 'Editar';
      this.campanhaService.getAskById(this.data.askId).subscribe(ask => {
        ask.created_at = moment(ask.created_at).format('yyyy-MM-DD');
        ask.updated_at = moment(ask.updated_at).format('yyyy-MM-DD');

        this.form.patchValue(ask);
        this.answers = ask.answer_options
      });
    }
  }

  ngOnInit(){
  }


  inicializarForm(){

    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      description: new UntypedFormControl('', Validators.required),
      component_type: new UntypedFormControl('', Validators.required),
      is_required: new UntypedFormControl(true, Validators.required),
      created_at: new UntypedFormControl(''),
      updated_at: new UntypedFormControl(''),
      answer_options: new UntypedFormControl([])
    });

    this.answers = [];

    this.answers.push({
      sequence: 1,
      description: 'Opção 1',
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.answers, event.previousIndex, event.currentIndex);

    this.answers.forEach((answer, index) => {
      answer.sequence = (index + 1);
    })
  }

  removerOpcaoResposta(index: any) {
    this.answers.splice(index, 1)
  }

  adicionarOpcaoResposta(){

    this.answers.push({
      sequence: (this.answers.length + 1),
      description: 'Opção ' + (this.answers.length + 1),
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  onAlteraOpcaoResposta(event: any, index: any) {
    this.answers[index].description = event.target.value;
  }

  onCheckbox(event: any, index: any){
    event.checked ? this.answers[index].active = true : this.answers[index].active = false;
  }

  onCancela(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.answers.length == 0 &&
      (this.form.controls['component_type'].value  === 'radio' ||
      this.form.controls['component_type'].value  === 'checkbox')){
     this.messageService.showErrorMessage(`Para o tipo de resposta ${this.form.controls['component_type'].value  === 'radio' ? "'Múltipla escolha'" : "'Caixas de seleção'"} é necessário inserir ao menos uma opção de resposta.`)
     return;
   }

    if(this.form.controls['component_type'].value  !== 'radio' &&
       this.form.controls['component_type'].value  !== 'checkbox') {

        this.form.controls['answer_options'].setValue([])
    } else {
      this.form.controls['answer_options'].setValue(this.answers)
    }

    if(this.form.valid){

      if(!this.isEdicao){
        this.campanhaService.saveAsk(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.pergunta} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000);
        })

      } else {
        this.campanhaService.updateAsk(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.pergunta} ${interfaceProperties.mensagem.atualizado_com_sucesso}`, 5000);
        })
      }

      this.router.navigate(['campanha/listar-perguntas']);

      this.dialogRef.close();
    }
  }

}

export interface DialogData {
  askId: string;
  type: string;
}
