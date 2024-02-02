import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../acesso/guards/auth.guard';
import { DadosComponent } from './dados/dados.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

const routes: Routes = [
  { path: '', redirectTo: 'perfil', pathMatch: 'full'},
  {
    path: 'perfil',
    component: DadosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'configuracoes',
    component: ConfiguracoesComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsuarioRoutingModule {}
