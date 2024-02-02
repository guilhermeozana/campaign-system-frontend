import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { CurrentUser } from './shared/models/current-user';
import { CurrencyPipe } from '@angular/common';
import { ThemingService } from './shared/services/theming.service';
import {OverlayContainer} from '@angular/cdk/overlay';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn$: Observable<boolean>;
  isProfileSelected$: Observable<boolean>;
  title: string;
  interfaceProperty = interfaceProperties;

  private currentUser = new BehaviorSubject<any>(new CurrentUser());

  @HostBinding('class')
  get themeMode(){
    return `theme-${this.themingService.themePalette.value}-${this.themingService.themeMode.value}`
  }

  constructor(private authService: AuthService,
    private themingService: ThemingService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef) {
      this.isLoggedIn$ = this.authService.isLoggedIn$;
      this.isProfileSelected$ = this.authService.isProfileSelected$;
      this.title = this.interfaceProperty['titulo']['nome_sistema'];
      this.themingService.setOverlayContainerTheme(this.themingService.themePalette.value);
  }

  ngAfterContentChecked(): void {
    this.cdr.detectChanges();
  }

  onLogout(): void {
    this.authService.logout();
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }
}
