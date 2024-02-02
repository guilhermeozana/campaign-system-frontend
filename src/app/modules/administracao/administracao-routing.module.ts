import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../acesso/guards/auth.guard';
import { ListarPefisComponent } from './perfis/listar-perfis/listar-perfis.component';
import { ListarMenuComponent } from './menu/listar-menu/listar-menu.component';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { CriarSenhaComponent } from './usuarios/criar-senha/criar-senha.component';

const routes: Routes = [
  { path: '', redirectTo: 'perfis', pathMatch: 'full'},
  {
    path: 'perfis',
    component: ListarPefisComponent,
    canActivate: [authGuard],
  },
  {
    path: 'menu',
    component: ListarMenuComponent,
    canActivate: [authGuard],
  },
  {
    path: 'usuarios',
    component: ListarUsuariosComponent,
    canActivate: [authGuard],
  },
  {
    path: 'nova-senha',
    component: CriarSenhaComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministracaoRoutingModule {}
