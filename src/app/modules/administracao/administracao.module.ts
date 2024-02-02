import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarMenuComponent } from './menu/listar-menu/listar-menu.component';
import { ManterMenuComponent } from './menu/manter-menu/manter-menu.component';
import { AdministracaoRoutingModule } from './administracao-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { ManterPerfisComponent } from './perfis/manter-perfis/manter-perfis.component';
import { ListarPefisComponent } from './perfis/listar-perfis/listar-perfis.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AppModule } from 'src/app/app.module';
import { ListarUsuariosComponent } from './usuarios/listar-usuarios/listar-usuarios.component';
import { ManterUsuariosComponent } from './usuarios/manter-usuarios/manter-usuarios.component';
import { CriarSenhaComponent } from './usuarios/criar-senha/criar-senha.component';

@NgModule({
  declarations: [
    ListarMenuComponent,
    ManterMenuComponent,
    ManterPerfisComponent,
    ListarPefisComponent,
    ListarUsuariosComponent,
    ManterUsuariosComponent,
    CriarSenhaComponent,
  ],
  imports: [
    CommonModule,
    AdministracaoRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DragDropModule,
  ]
})
export class AdministracaoModule { }
