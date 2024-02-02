import { CpfValidator } from './../../../../shared/validators/cpf.validator';
import { Component, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SystemEnum } from 'src/app/shared/enums/system-enum';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResetPassword } from '../../models/reset-password';
import { MessageService } from 'src/app/shared/services/message.service';
import { PasswordValidator} from 'src/app/shared/validators/password.validator';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-redefinicao-senha',
  templateUrl: './redefinicao-senha.component.html',
  styleUrls: ['./redefinicao-senha.component.scss']
})
export class RedefinicaoSenhaComponent {

  interfaceProperty = interfaceProperties;
  resetPassword: ResetPassword = new ResetPassword();

  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide = true;


  constructor(private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) {
      this.form = this.formBuilder.group({
        novaSenha: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        confirmacaoNovaSenha: new FormControl<string>('', [Validators.required, Validators.minLength(6)]),
        reset_password_token: new FormControl<string>('', Validators.required),
        email: new FormControl<string>('', Validators.required)
      },
      { validators: this.checkPasswords });
    }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => this.form.patchValue(params))
  }

  onSubmit() {

    if(this.form.valid){
      this.resetPassword = {
        email: this.form.controls['email'].value,
        token: this.form.controls['reset_password_token'].value,
        password: this.form.controls['novaSenha'].value,
        confirmationPassword: this.form.controls['confirmacaoNovaSenha'].value
      }

      this.authService.resetPassword(this.resetPassword).subscribe(() => {
        this.messageService.showSuccessMessage('Senha alterada com sucesso!', 5000)
        this.router.navigate(['acesso']);
      });

    }
  }

  checkPasswords: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('novaSenha')!.value;
    let confirmPass = group.get('confirmacaoNovaSenha')!.value
    return pass === confirmPass ? null : { notSame: true }
  }

}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}
