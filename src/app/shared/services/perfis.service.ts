import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfis } from 'src/app/modules/administracao/models/perfis';

@Injectable({
  providedIn: 'root',
})
export class PerfisService {
  constructor(private _http: HttpClient) {}

  getPerfis(): Observable<Perfis[]>{
    return this._http.get<Perfis[]>(`${environment.baseUrl}/profiles`);
  }

  getPerfisById(id:any): Observable<any>{
    return this._http.get<any>(`${environment.baseUrl}/profiles/${id}`);
  }

  savePerfis(perfis: any){
    return this._http.post<any>(`${environment.baseUrl}/profiles`, perfis);
  }

  updatePerfis(perfis: any){
    return this._http.put<any>(`${environment.baseUrl}/profiles/${perfis.id}`, perfis);
  }

  deletePerfis(id:number):Observable<void>{
    return this._http.delete<void>(`${environment.baseUrl}/profiles/${id}`);
  }
}
