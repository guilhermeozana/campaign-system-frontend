import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuarios } from 'src/app/modules/administracao/models/usuarios';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private _http: HttpClient) {}

  getUsuarios(): Observable<Usuarios[]>{
    return this._http.get<Usuarios[]>(`${environment.baseUrl}/list_users`);
  }
  getUsuariosById(id:any): Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}/users/${id}`);
  }

  saveUsuarios(usuarios: any){
    return this._http.post<any>(`${environment.baseUrl}/users`, usuarios);
  }

  updateUsuarios(usuarios: any){
    return this._http.put<any>(`${environment.baseUrl}/users/${usuarios.id}`, usuarios);
  }

  deleteUsuarios(id:number):Observable<void>{
    return this._http.delete<void>(`${environment.baseUrl}/users/${id}`);
  }
}
