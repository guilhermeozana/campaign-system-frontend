import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AcessoModule } from './modules/acesso/acesso.module';
import { CoreModule } from './core/core.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { HomeModule } from './modules/home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { httpInterceptorProviders } from './core/interceptors';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatList, MatListModule} from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { FooterComponent } from './shared/components/footer/footer.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from './shared/shared.module';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { MenuComponent } from './shared/components/menu/menu.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { CampanhaModule } from './modules/campanha/campanha.module';
import { MaterialModule } from './modules/material/material.module';
import { ClickInsideDirective } from './shared/diretives/click-inside.diretive';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent,
    FooterComponent,
    PageNotFoundComponent,
    MenuComponent,
    LoaderComponent,
    ClickInsideDirective

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    AcessoModule,
    FlexLayoutModule,
    CoreModule,
    AppRoutingModule,
    HomeModule,
    HttpClientModule,
    SharedModule,
    UsuarioModule,
    CampanhaModule,
    MaterialModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
