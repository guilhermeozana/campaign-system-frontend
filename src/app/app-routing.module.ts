import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'acesso',
    loadChildren: () =>
      import('./modules/acesso/acesso.module').then((m) => m.AcessoModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'usuario',
    loadChildren: () =>
      import('./modules/usuario/usuario.module').then((m) => m.UsuarioModule),
  },
  {
    path: 'campanha',
    loadChildren: () =>
      import('./modules/campanha/campanha.module').then((m) => m.CampanhaModule),
  },{
    path: 'administracao',
    loadChildren: () =>
      import('./modules/administracao/administracao.module').then((m) => m.AdministracaoModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
