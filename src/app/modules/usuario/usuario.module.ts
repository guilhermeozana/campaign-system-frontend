import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosComponent } from './dados/dados.component';
import { UsuarioRoutingModule } from './usuario-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';
import {MatRadioModule} from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DadosComponent,
    ConfiguracoesComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class UsuarioModule { }
