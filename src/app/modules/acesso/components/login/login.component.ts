import { MessageService } from './../../../../shared/services/message.service';
import { SystemEnum } from './../../../../shared/enums/system-enum';
import { Component, Output, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from '../../models/login';
import { User } from '../../models/user';
import { CampanhaService } from 'src/app/shared/services/campanha.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() private redefinirSenha = new EventEmitter();
  interfaceProperty = interfaceProperties;
  login: Login = new Login();
  user: User = new User();
  hide = true;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    system: [SystemEnum.AGIDE_TESTE.id, Validators.required],
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService,
              private campanhaService: CampanhaService) {}

  ngOnInit() {
    localStorage.removeItem('token');
    this.authService.loggedIn.next(false);
  }

  onSubmit() {
    try {
      if (this.form.valid) {
          this.user.email = this.form.controls['email'].value
          this.user.password = this.form.controls['password'].value
          this.user.system = this.form.controls['system'].value
          this.login.user = this.user

          this.authService.login(this.login).subscribe(result => {
            if (result && (result.body.status == 201 || result.body.status.code == 200)) {

              if (!result.headers.get('authorization')) {
                this.login.user.password = '';
                localStorage.setItem('user', JSON.stringify(this.login.user));
                this.messageService.showSuccessMessage(result.body.message, 5000);

                this.router.navigate(['/acesso/verificacao-duas-etapas']);

              } else {
                localStorage.removeItem("user");
                localStorage.setItem('token', result.headers.get('authorization')?.substring(7) as string);

                this.messageService.showSuccessMessage(result.body.status.message, 5000);
                this.router.navigate(['/acesso/selecionar-perfil']);
              }

            }
          });

      }
    } catch (error) {
      console.error(error);
    }
  }

  onRedefinirSenha(){
    this.redefinirSenha.emit();
  }


}
