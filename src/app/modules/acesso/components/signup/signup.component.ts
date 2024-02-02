import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { MessageService } from 'src/app/shared/services/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  @Output() private login = new EventEmitter();
  interfaceProperty = interfaceProperties;
  account: Account = new Account();
  user: User = new User();
  hide = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', Validators.required],
    cpf: ['', Validators.required],
  });

  constructor(private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService) {}

    onSubmit() {
      try {
        if (this.form.valid) {
          this.user.email = this.form.controls['email'].value;
          this.user.password = this.form.controls['password'].value;
          this.user.name = this.form.controls['name'].value;
          this.user.cpf = this.form.controls['cpf'].value;
          this.account.user = this.user;

          this.authService.createAccount(this.account).subscribe(result => {
            this.messageService.showSuccessMessage('Cadastro realizado com sucesso!', 5000)
            this.router.navigate(['acesso'])
          });
        }
      } catch (error) {
        console.error(error);
      }
    }

    onLogin(){
      this.login.emit();
    }
}
