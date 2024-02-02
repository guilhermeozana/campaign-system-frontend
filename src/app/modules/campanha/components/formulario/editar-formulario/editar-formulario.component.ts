import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { CampanhaService } from 'src/app/shared/services/campanha.service';
import { MessageService } from 'src/app/shared/services/message.service';
import { CheckboxAnswer } from '../../../models/checkbox-answer';

@Component({
  selector: 'app-editar-formulario',
  templateUrl: './editar-formulario.component.html',
  styleUrls: ['./editar-formulario.component.scss'],
})
export class EditarFormularioComponent {
  interfaceProperty = interfaceProperties;

  form!: UntypedFormGroup;
  askSelected!: any;
  checkboxAnswer = new CheckboxAnswer();

  constructor(
    private fb: FormBuilder,
    private campanhaService: CampanhaService,
    private router: Router,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public dialogRef: MatDialogRef<EditarFormularioComponent>
  ) {}

  ngOnInit() {
    this.initForm();
    this.askSelected = this.data.askSelected;
    this.checkboxAnswer = this.data.checkboxAnswer;
    this.form.patchValue(this.data.answer);
  }

  initForm() {
    this.form = this.fb.group({
      survey_id: [null],
      ask_id: [null],
      answer_option_id: [null],
      user_id: [null],
      answer_text: [null, Validators.required],
    });
  }

  onCancela(): void {
    this.dialogRef.close();
  }

  onAlteraRespostaRadio(item: any) {
    this.form.controls['answer_option_id'].setValue(item.id);
    this.form.controls['answer_text'].setValue(item.description);
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
}

export interface DialogData {
  askSelected: any;
  answer: any;
  isLastAnswer: boolean;
  checkboxAnswer: CheckboxAnswer;
}
