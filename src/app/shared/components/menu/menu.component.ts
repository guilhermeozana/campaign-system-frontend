import { Observable } from 'rxjs';
import { Component, SimpleChanges, OnChanges, AfterViewChecked, ChangeDetectorRef, Input } from '@angular/core';
import { interfaceProperties } from '../../resources/interface_pt_br';
import { MenuService } from '../../services/menu.service';
import { AuthService } from '../../services/auth.service';
import { Menu } from '../../models/menu';
import { SystemEnum } from '../../enums/system-enum';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements AfterViewChecked{
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean | null = false;
  interfaceProperty = interfaceProperties;
  menu$!:Observable<Menu[]>;
  @Input() isCompressedMenu!: boolean

  constructor(private menuService: MenuService, private cdr: ChangeDetectorRef, private authService: AuthService){
  }

  ngAfterViewChecked(){
    this.cdr.detectChanges();
 }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.isLoggedIn){
     this.menu$ = this.menuService.getMenusByProfileIdAndSystemId(localStorage.getItem('profile_id'), SystemEnum.AGIDE_APP.id);
    }
  }
}
