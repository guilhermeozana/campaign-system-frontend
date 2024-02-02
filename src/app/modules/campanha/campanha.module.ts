import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarCampanhasComponent } from './components/campanha/listar-campanhas/listar-campanhas.component';
import { ManterCampanhaComponent } from './components/campanha/manter-campanha/manter-campanha.component';
import { CampanhaRoutingModule } from './campanha-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ManterBannerComponent } from './components/banner/manter-banner/manter-banner.component';
import { ListarBannersComponent } from './components/banner/listar-banners/listar-banners.component';
import { ListarPerguntasComponent } from './components/pergunta/listar-perguntas/listar-perguntas.component';
import { ManterPerguntaComponent } from './components/pergunta/manter-pergunta/manter-pergunta.component';
import { ListarQuestionariosComponent } from './components/questionario/listar-questionarios/listar-questionarios.component';
import { ManterQuestionarioComponent } from './components/questionario/manter-questionario/manter-questionario.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FormularioComponent } from './components/formulario/formulario.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppModule } from 'src/app/app.module';
import { EditarFormularioComponent } from './components/formulario/editar-formulario/editar-formulario.component';

@NgModule({
  declarations: [
    ListarCampanhasComponent,
    ManterCampanhaComponent,
    ListarBannersComponent,
    ManterBannerComponent,
    ListarPerguntasComponent,
    ManterPerguntaComponent,
    ListarQuestionariosComponent,
    ManterQuestionarioComponent,
    FormularioComponent,
    EditarFormularioComponent
  ],
  imports: [
    CommonModule,
    CampanhaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
  ]
})
export class CampanhaModule { }
