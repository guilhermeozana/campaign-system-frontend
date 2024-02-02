import { TextMaskModule } from 'angular2-text-mask';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { AcessoRoutingModule } from './acesso-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './components/signup/signup.component';
import { SelecaoPerfilComponent } from './components/selecao-perfil/selecao-perfil.component';
import {MatSelectModule} from '@angular/material/select';
import { RecuperacaoSenhaComponent } from './components/recuperacao-senha/recuperacao-senha.component';
import { MatRadioModule } from '@angular/material/radio';
import { NgxMaskModule } from 'ngx-mask';
import { AcessoComponent } from './acesso.component';
import { RedefinicaoSenhaComponent } from './components/redefinicao-senha/redefinicao-senha.component';
import { VerificacaoDuasEtapasComponent } from './components/verificacao-duas-etapas/verificacao-duas-etapas.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    SelecaoPerfilComponent,
    RecuperacaoSenhaComponent,
    AcessoComponent,
    RedefinicaoSenhaComponent,
    VerificacaoDuasEtapasComponent
  ],
  imports: [
    CommonModule,
    AcessoRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(),
  ]
})
export class AcessoModule { }
