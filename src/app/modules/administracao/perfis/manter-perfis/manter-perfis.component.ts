import { Component, Inject, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { PerfisService } from 'src/app/shared/services/perfis.service';
import { MessageService } from 'src/app/shared/services/message.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { Perfis } from '../../models/perfis';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manter-perfis',
  templateUrl: './manter-perfis.component.html',
  styleUrls: ['./manter-perfis.component.scss']
})
export class ManterPerfisComponent  {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';


  perfis:Perfis[] = [];

  form!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private perfisService: PerfisService,
    private router: Router,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ManterPerfisComponent>,
  ) {
    this.inicializarForm();

    if(this.data?.askId){

      this.isEdicao = true;
      this.acao = 'Editar';
      this.perfisService.getPerfisById(this.data.askId).subscribe(ask => {
        ask.created_at = moment(ask.created_at).format('yyyy-MM-DD');
        ask.updated_at = moment(ask.updated_at).format('yyyy-MM-DD');

        this.form.patchValue(ask);
        this.perfis = ask.answer_options
      });
    }
  }

  ngOnInit(){
  }


  inicializarForm(){

    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', Validators.required),
      created_at: new UntypedFormControl(''),
      updated_at: new UntypedFormControl('')
    });

    this.perfis = [];

    this.perfis.push({
      id: 1,
      name: 'Perfil 1',
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.perfis, event.previousIndex, event.currentIndex);

    this.perfis.forEach((perfis, index) => {
      perfis.id = (index + 1);
    })
  }

  onCancela(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.form.valid){
      console.log(this.form.value)
      if(!this.isEdicao){
        this.perfisService.savePerfis(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.perfil} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000);
        })

      } else {
        this.perfisService.updatePerfis(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.perfil} ${interfaceProperties.mensagem.atualizado_com_sucesso}`, 5000);
        })
      }

      this.dialogRef.close();
    }
  }

}

export interface DialogData {
  askId: string;
  type: string;
}
