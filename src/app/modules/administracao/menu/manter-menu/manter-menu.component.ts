import { Component, Inject, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormControl, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { MenuService } from 'src/app/shared/services/menu.service';
import { MessageService } from 'src/app/shared/services/message.service';
import {CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray} from '@angular/cdk/drag-drop';
import { ManterMenu } from '../../models/menu';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-manter-menu',
  templateUrl: './manter-menu.component.html',
  styleUrls: ['./manter-menu.component.scss']
})
export class ManterMenuComponent  {
  interfaceProperty = interfaceProperties;
  isEdicao = false;
  acao: string = 'Incluir';


  menu:ManterMenu[] = [];
  controllers: any[] = [];

  form!: UntypedFormGroup;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private menuService: MenuService,
    private router: Router,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<ManterMenuComponent>,
  ) {
    this.inicializarForm();
    this.listarController();
    if(this.data?.askId){

      this.isEdicao = true;
      this.acao = 'Editar';
      this.menuService.getMenuById(this.data.askId).subscribe(ask => {
        ask.created_at = moment(ask.created_at).format('yyyy-MM-DD');
        ask.updated_at = moment(ask.updated_at).format('yyyy-MM-DD');

        this.form.patchValue(ask);
        this.menu = ask.answer_options
      });
    }
  }

  ngOnInit(){
  }


  inicializarForm(){

    this.form = new UntypedFormGroup({
      id: new UntypedFormControl(''),
      name: new UntypedFormControl('', Validators.required),
      active: new UntypedFormControl('true'),
      url: new UntypedFormControl('', Validators.required),
      system_id: new UntypedFormControl('1'),
      prefix: new UntypedFormControl([], Validators.required),
      icon: new UntypedFormControl('', Validators.required),
    });

    this.menu = [];

    this.menu.push({
      id: 1,
      name: 'Perfil 1',
      url: '',
      active: true,
      system_id: 1,
      menus_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
      prefix: [],
      icon:'icon',
    })
  }
  listarController(){
    this.menuService.getController().subscribe(controller => {
      this.controllers = controller.map((value, index) => {
        return {
          prefix: index + 1,
          name: value
        };
      })
      console.log(this.controllers)
    })

  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.menu, event.previousIndex, event.currentIndex);

    this.menu.forEach((menu, index) => {
      menu.id = (index + 1);
    })
  }

  onCancela(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    if(this.form.valid){
      console.log(this.form.value)
      if(!this.isEdicao){
        this.menuService.saveMenu(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.menu} ${interfaceProperties.mensagem.salvo_com_sucesso}`, 5000);
        })

      } else {
        this.menuService.updateMenu(this.form.value).subscribe(result => {
          this.messageService.showSuccessMessage(`${interfaceProperties.label.menu} ${interfaceProperties.mensagem.atualizado_com_sucesso}`, 5000);
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
