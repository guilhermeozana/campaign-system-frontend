import { Component, Inject, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { MessageService } from 'src/app/shared/services/message.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { Usuarios } from '../../models/usuarios';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manter-usuarios',
  templateUrl: './manter-usuarios.component.html',
  styleUrls: ['./manter-usuarios.component.scss']
})
export class ManterUsuariosComponent  {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';


  usuarios:Usuarios[] = [];

  form!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuariosService,
    private router: Router,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ManterUsuariosComponent>,
  ) {
    this.inicializarForm();

    if(this.data?.askId){

      this.isEdicao = true;
      this.acao = 'Editar';
      this.usuariosService.getUsuariosById(this.data.askId).subscribe(ask => {
        ask.created_at = moment(ask.created_at).format('yyyy-MM-DD');
        ask.updated_at = moment(ask.updated_at).format('yyyy-MM-DD');

        this.form.patchValue(ask);
        this.usuarios = ask.answer_options
      });
    }
  }

  ngOnInit(){
  }


  inicializarForm(){

    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', Validators.required),
      email: new UntypedFormControl('', Validators.required),
      profile: new UntypedFormControl(''),
      created_at: new UntypedFormControl(''),
      updated_at: new UntypedFormControl('')
    });

    this.usuarios = [];

    this.usuarios.push({
      id: 1,
      name: '',
      email: '',
      profile: '',
      active: true,
      created_at: new Date(),
      updated_at: new Date()
    })
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.usuarios, event.previousIndex, event.currentIndex);

    this.usuarios.forEach((usuarios, index) => {
      usuarios.id = (index + 1);
    })
  }

  onCancela(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.form.valid){
      console.log(this.form.value)
      if(!this.isEdicao){
        this.usuariosService.saveUsuarios(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.perfil} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000);
        })

      } else {
        this.usuariosService.updateUsuarios(this.form.value).subscribe(result => {
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
