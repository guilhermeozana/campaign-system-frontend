import { CpfValidator } from '../../../../shared/validators/cpf.validator';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SystemEnum } from 'src/app/shared/enums/system-enum';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ResetPassword } from '../../models/reset-password';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-recuperacao-senha',
  templateUrl: './recuperacao-senha.component.html',
  styleUrls: ['./recuperacao-senha.component.scss']
})
export class RecuperacaoSenhaComponent {
  interfaceProperty = interfaceProperties;
  @Output() private login = new EventEmitter();
  resetPassword: ResetPassword = new ResetPassword();

  form: FormGroup<any> = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    cpf: ['', [Validators.required, CpfValidator.validate]],
    selecao: ['email', Validators.required],
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService) {}

  ngOnInit() {
  }

  onSubmit() {
    if(this.form.controls[this.form.controls['selecao'].value].valid){
      this.resetPassword.email = this.form.controls['email'].value;

      this.authService.sendEmailResetPassword(this.resetPassword)
        .subscribe(() => {
          this.messageService.showInfoMessage(`Um E-mail de redefinição de senha foi enviado para ${this.form.controls['email'].value}.`, 5000)
          this.router.navigate(['acesso'])
        })
    }

  }

  cpfFormater(value: any):any {
    const data = value
        ? `${value.substring(0, 3)}.${value.substring(3,6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`
        : null;
    return data;
  }

  onLogin(){
    this.login.emit();
  }
}
