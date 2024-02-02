import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { User } from '../../models/user';
import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { FormBuilder, Validators } from '@angular/forms';
import { SystemEnum } from 'src/app/shared/enums/system-enum';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { disableDebugTools } from '@angular/platform-browser';
import { MessageService } from 'src/app/shared/services/message.service';
import { Observable, Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-verificacao-duas-etapas',
  templateUrl: './verificacao-duas-etapas.component.html',
  styleUrls: ['./verificacao-duas-etapas.component.scss']
})
export class VerificacaoDuasEtapasComponent {
  interfaceProperty = interfaceProperties;
  login: Login = new Login();
  user: User = new User();

  private reSendTokenInterval: number = 60; // Tempo em segundos entre reenvios
  private destroyTimer$: Subject<void> = new Subject<void>();
  private secondsRemaining: number = this.reSendTokenInterval;
  private timer!: Observable<number>;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    system: [SystemEnum.AGIDE_APP.id, Validators.required],
    //verification_token: ['', Validators.required],
    verification_token1: [''],
    verification_token2: [''],
    verification_token3: [''],
    verification_token4: [''],
    verification_token5: [''],
    verification_token6: [''],
  });

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router,
              private messageService: MessageService) {
              }

  ngOnInit() {
    if(localStorage.getItem('user')){
      this.form.patchValue(JSON.parse(localStorage.getItem('user') || ''))
    }

    document.getElementById('input-focus')?.focus();


    this.addInputEvents();
    this.startTimer();
  }

  onSubmit() {
    try {
      if (this.form.valid) {
        this.user.email = this.form.controls['email'].value
        this.user.system = this.form.controls['system'].value

        this.user.verification_token = (this.form.controls['verification_token1'].value || '') + this.form.controls['verification_token2'].value + this.form.controls['verification_token3'].value + this.form.controls['verification_token4'].value + this.form.controls['verification_token5'].value + this.form.controls['verification_token6'].value
        //this.user.verification_token = this.form.controls['verification_token'].value

        this.login.user = this.user

        this.authService.login(this.login).subscribe(result => {

          if (result && result.body.status.code == 200) {

            if (result.headers.get('authorization')) {
              localStorage.removeItem("user");
              localStorage.setItem('token', result.headers.get('authorization')?.substring(7) as string);
+
              this.authService.getProfiles().subscribe(profiles => {
                if(profiles.length == 1){
                  this.authService.setUserProfile(profiles[0].id)
                  this.authService.updateLoggedIn();
                  this.router.navigate(['home'])
                } else {
                  this.messageService.showSuccessMessage(result.body.status.message, 5000);
                  this.router.navigate(['acesso/selecionar-perfil']);
                }
              });
            }

          }



        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  onPaste(evento: any) {
      const inputs = document.querySelectorAll('input');

      evento.stopPropagation();
      evento.preventDefault();

      let codigo:any = evento.clipboardData!.getData('Text');

      codigo = codigo.split('');

      this.form.controls['verification_token1'].setValue(codigo[0] || '');
      this.form.controls['verification_token2'].setValue(codigo[1] || '');
      this.form.controls['verification_token3'].setValue(codigo[2] || '');
      this.form.controls['verification_token4'].setValue(codigo[3] || '');
      this.form.controls['verification_token5'].setValue(codigo[4] || '');
      this.form.controls['verification_token6'].setValue(codigo[5] || '');

      if(codigo.length >= 6){
        inputs[5].focus();
      } else {
        inputs[codigo.length -1].focus();
      }

  }

  onKeydown(evento: any){

  }

  addInputEvents() {
    const botao = document.querySelector('button');
    const inputs = document.querySelectorAll('input');

    for(let i = 0; i < inputs.length; i++) {

      inputs[i].addEventListener('input', () => {
        const currentInput = inputs[i];
        const nextInput: any = inputs[i + 1];

        if(currentInput.value != '' && nextInput){
          nextInput.focus();
        }

      });

      inputs[i].addEventListener('keydown', (evento: any) => {
        if(evento.keyCode === 8 || evento.keyCode === 46) {
          if(inputs[i-1]){
            evento.target.value = '';
            inputs[i-1].focus();
          }
        }
      })
    }

  }

  resendToken(){

    if (this.form.valid) {
      this.user.email = this.form.controls['email'].value
      this.login.user = this.user

      this.authService.resendToken(this.login).subscribe(() => {
          this.messageService.showInfoMessage(`Um novo token foi enviado para ${this.form.controls['email'].value}`);
          this.resetTimer();


      }, error => console.log(error.message));

  }

  }

  private startTimer(): void {
    this.timer = timer(0, 1000).pipe(
      takeUntil(this.destroyTimer$)
    );

    this.timer.subscribe(() => {
      if (this.secondsRemaining > 0) {
        this.secondsRemaining--;
      }
    });
  }

  public getSecondsRemaining(): number {
    return this.secondsRemaining;
  }

  public resetTimer(): void {
    this.secondsRemaining = this.reSendTokenInterval;
  }

  public stopTimer(): void {
    this.destroyTimer$.next();
  }
}
