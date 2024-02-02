import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, firstValueFrom, lastValueFrom, map, tap } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from 'src/app/modules/acesso/models/login';
import { Account } from 'src/app/modules/acesso/models/account';
import { environment } from 'src/environments/environment';
import * as jwt_decode from 'jwt-decode';
import { CurrentUser } from '../models/current-user';
import { Profile } from 'src/app/modules/acesso/models/profile';
import { ResetPassword } from 'src/app/modules/acesso/models/reset-password';
import { EmailResetPassword } from 'src/app/modules/acesso/models/email-reset-password';
import { User } from 'src/app/modules/acesso/models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  profileSelected = new BehaviorSubject<boolean>(false);
  isProfileSelected$ = this.profileSelected.asObservable();

  private currentUser!: CurrentUser;

  constructor(private http: HttpClient, private router: Router, private messageService: MessageService) {
    this.loggedIn.next(localStorage.getItem('token') ? true : false)
    this.profileSelected.next(localStorage.getItem('profile_id') ? true : false)
  }

  //Login

  login(login: any):Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/login`, login, {observe: 'response'});
  }

  //Reenviar token

  resendToken(user: any):Observable<any> {
    return this.http.post<any>(`${environment.baseUrl}/resend_token`, user);
  }

  getAuthorizationToken() {
    const token = localStorage.getItem('token');
    return token;
  }

  getTokenExpirationDate(token: string): any {
    const decoded: any = jwt_decode.default(token);

    if (decoded.exp === undefined) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }

  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }

    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }

    return !(date.valueOf() > new Date().valueOf());
  }

  updateLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return this.loggedIn.next(false);
    } else if (this.isTokenExpired(token)) {
      return this.loggedIn.next(false);
    } else if (!localStorage.getItem('profile_id')){
      return this.loggedIn.next(false);
    }

    return this.loggedIn.next(true)
  }

  getCurrentUser(): Observable<CurrentUser>{
    return this.http.get<CurrentUser>(`${environment.baseUrl}/current_user`);
  }

  //Logout

  logout(): void {
    localStorage.removeItem('profile_id');
    localStorage.removeItem('token');

    this.updateLoggedIn();
    this.router.navigate(['acesso']);
  }

  //Cadastro

  createAccount(account: Account){
    return this.http.post<any>(`${environment.baseUrl}/signup`, account);
  }

  //Seleção de Perfil

  getProfiles(): Observable<Profile[]>{
    return this.http.get<Profile[]>(`${environment.baseUrl}/profiles`);
  }

  getProfileById(id: any): Observable<Profile>{
    return this.http.get<Profile>(`${environment.baseUrl}/profiles/${id}`);
  }

  setUserProfile(id: any){
    this.profileSelected.next(true);
    localStorage.setItem('profile_id', id);
  }

  //Redefinicao de Senha

  sendEmailResetPassword(emailResetPassword: EmailResetPassword): Observable<any> {
    return this.http.post(`${environment.baseUrl}/password/forgot`, emailResetPassword);
  }

  resetPassword(resetPassword: ResetPassword){
    return this.http.post(`${environment.baseUrl}/password/reset`, resetPassword);
  }


  // Sistema

  getSystems(): Observable<Profile[]>{
    return this.http.get<Profile[]>(`${environment.baseUrl}/profiles`);
  }


}
