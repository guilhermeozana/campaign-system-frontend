import { interfaceProperties } from 'src/app/shared/resources/interface_pt_br';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, AfterViewChecked, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { CurrentUser } from '../../models/current-user';
import { ThemingService } from '../../services/theming.service';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements AfterViewChecked {

  @Input() isLoggedIn: boolean | null = false;
  @Input() isProfileSelected: boolean | null = false;
  @Input() title = '';
  @Output() private logout = new EventEmitter();
  @Output() private switchTheme = new EventEmitter();
  @ViewChild('sidenav') sidenav!: MatSidenav;

  interfaceProperty = interfaceProperties;
  themeMode: string = '';

  constructor(private authService: AuthService,
    public loadingService: LoadingService,
    private cdr: ChangeDetectorRef,
    private themingService: ThemingService,
    public router: Router) {

  }

  ngOnInit(){

  }

  ngAfterViewChecked(): void {
    this.cdr.detectChanges();

  }

  onLogout(): void {
    this.logout.emit();
  }
}
