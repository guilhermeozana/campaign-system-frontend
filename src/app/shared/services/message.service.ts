import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  data = {
    title: '',
    message: ''
  }

  constructor(private snackBar: MatSnackBar){}

  showInfoMessage(message: string, duration?: number){
    this.data.title = 'Mensagem Informativa'
    this.data.message = message

    return this.snackBar.openFromComponent(SnackbarComponent, {
      panelClass: ['info-snackbar'],
      data:  this.data,
      duration: duration
    });
  }

  showErrorMessage(message: string, duration?: number){
    this.data.title = 'Mensagem de Erro'
    this.data.message = message

    return this.snackBar.openFromComponent(SnackbarComponent, {
      panelClass: ['error-snackbar'],
      data: this.data,
      duration: duration
    });
  }

  showSuccessMessage(message: string, duration?: number){
    this.data.title = 'Mensagem de Sucesso'
    this.data.message = message

    return this.snackBar.openFromComponent(SnackbarComponent, {
      panelClass: ['success-snackbar'],
      data: this.data,
      duration: duration
    });
  }




}
