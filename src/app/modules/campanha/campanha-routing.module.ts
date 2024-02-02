import { ListarBannersComponent } from './components/banner/listar-banners/listar-banners.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListarCampanhasComponent } from "./components/campanha/listar-campanhas/listar-campanhas.component";
import { authGuard } from "../acesso/guards/auth.guard";
import { ManterCampanhaComponent } from "./components/campanha/manter-campanha/manter-campanha.component";
import { ManterBannerComponent } from './components/banner/manter-banner/manter-banner.component';
import { ListarQuestionariosComponent } from './components/questionario/listar-questionarios/listar-questionarios.component';
import { ManterQuestionarioComponent } from './components/questionario/manter-questionario/manter-questionario.component';
import { ListarPerguntasComponent } from './components/pergunta/listar-perguntas/listar-perguntas.component';
import { ManterPerguntaComponent } from './components/pergunta/manter-pergunta/manter-pergunta.component';
import { FormularioComponent } from './components/formulario/formulario.component';

const routes: Routes = [
  { path: 'listar-campanhas', component: ListarCampanhasComponent, canActivate: [authGuard]},
  { path: 'manter-campanha', component: ManterCampanhaComponent, canActivate: [authGuard]},
  { path: 'manter-campanha/:id', component: ManterCampanhaComponent, canActivate: [authGuard]},
  { path: 'listar-banners', component: ListarBannersComponent, canActivate: [authGuard]},
  { path: 'manter-banner', component: ManterBannerComponent, canActivate: [authGuard]},
  { path: 'manter-banner/:id', component: ManterBannerComponent, canActivate: [authGuard]},
  { path: 'listar-questionarios', component: ListarQuestionariosComponent, canActivate: [authGuard]},
  { path: 'manter-questionario', component: ManterQuestionarioComponent, canActivate: [authGuard]},
  { path: 'manter-questionario/:id', component: ManterQuestionarioComponent, canActivate: [authGuard]},
  { path: 'listar-perguntas', component: ListarPerguntasComponent, canActivate: [authGuard]},
  { path: 'manter-pergunta', component: ManterPerguntaComponent, canActivate: [authGuard]},
  { path: 'manter-pergunta/:id', component: ManterPerguntaComponent, canActivate: [authGuard]},
  { path: 'formulario', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CampanhaRoutingModule {}
