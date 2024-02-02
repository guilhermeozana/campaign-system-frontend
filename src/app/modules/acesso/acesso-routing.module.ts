import { authGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivateFn } from '@angular/router';
import { SelecaoPerfilComponent } from './components/selecao-perfil/selecao-perfil.component';
import { RecuperacaoSenhaComponent } from './components/recuperacao-senha/recuperacao-senha.component';
import { AcessoComponent } from './acesso.component';
import { RedefinicaoSenhaComponent } from './components/redefinicao-senha/redefinicao-senha.component';
import { VerificacaoDuasEtapasComponent } from './components/verificacao-duas-etapas/verificacao-duas-etapas.component';

const routes: Routes = [
  { path: '', component: AcessoComponent},
  { path: 'selecionar-perfil', component: SelecaoPerfilComponent},
  { path: 'redefinir-senha', component: RedefinicaoSenhaComponent},
  { path: 'verificacao-duas-etapas', component: VerificacaoDuasEtapasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcessoRoutingModule {}
