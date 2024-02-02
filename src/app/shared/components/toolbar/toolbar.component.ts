import { MatSidenav } from '@angular/material/sidenav';
import { interfaceProperties } from './../../resources/interface_pt_br';
import { AfterViewChecked, ChangeDetectorRef, Component, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { MatMenu } from '@angular/material/menu';
import { CurrentUser } from '../../models/current-user';
import { ThemingService } from '../../services/theming.service';
import { Profile } from 'src/app/modules/acesso/models/profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements AfterViewChecked {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean | null = false;
  @Input() isProfileSelected: boolean | null = false;
  @Input() title = '';
  @Output() private logout = new EventEmitter();
  @Output() private switchTheme = new EventEmitter();

  currentUser!: CurrentUser;
  interfaceProperty = interfaceProperties;
  tema: string = '';
  perfil!: Profile;
  isDark!: boolean;
  themePalette = 'agide';

  constructor(private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private themingService: ThemingService,
    public router: Router,
    public elementRef: ElementRef) {
      this.isDark = this.themingService.isDarkTheme();
      this.themePalette = this.themingService.themePalette.value || '';
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
 }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isLoggedIn){
      if(this.authService.getCurrentUser()){
        this.authService.getCurrentUser().subscribe(user => this.currentUser = user)
        this.authService.getProfileById(localStorage.getItem('profile_id')).subscribe(profile => this.perfil = profile)
      }
    }
  }

  onLogout(): void {
    this.logout.emit();
  }

  onSwitchThemeMode(){
    if(this.themingService.isDarkTheme()){
      this.themingService.setThemeMode('light');
    } else {
      this.themingService.setThemeMode('dark');
    }

  }

  onSwitchThemePalette(palette: string){
    this.themePalette = palette;
    this.themingService.setThemePalette(palette);
  }

}
