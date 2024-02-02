import { style } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';
import { ElementRef, HostBinding, Injectable, Inject } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DOCUMENT, PlatformLocation } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemingService {

  themeMode = new BehaviorSubject<string | null>('light');
  themeMode$ = this.themeMode.asObservable();

  themePalette = new BehaviorSubject<string | null>('agide');
  themePalette$ = this.themePalette.asObservable();

  constructor(private overlayContainer: OverlayContainer) {
    if(localStorage.getItem('themeMode')){
      this.themeMode.next(localStorage.getItem('themeMode'))
    }

    if(localStorage.getItem('themePalette')){
      this.themePalette.next(localStorage.getItem('themePalette'))
    }

  }

  isDarkTheme(){
    return this.themeMode.value === 'dark';
  }

  setThemeMode(mode: any){
    let currentTheme:any = `theme-${this.themePalette.value}-${this.themeMode.value}`;

    localStorage.setItem('themeMode', mode)
    this.themeMode.next(mode)

    this.setOverlayContainerTheme(currentTheme);
  }

  setThemePalette(palette: string) {
    let currentTheme:any = `theme-${this.themePalette.value}-${this.themeMode.value}`;

    localStorage.setItem('themePalette', palette);

    this.themePalette.next(palette);

    this.setOverlayContainerTheme(currentTheme);
  }

  setOverlayContainerTheme(currentTheme: any){
      this.overlayContainer.getContainerElement().classList.remove(currentTheme);
      this.overlayContainer.getContainerElement().classList.add(`theme-${this.themePalette.value}-${this.themeMode.value}`);
  }
}
