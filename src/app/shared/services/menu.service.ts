import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Menu } from '../models/menu';
import { ManterMenu } from 'src/app/modules/administracao/models/menu';
import { HttpClient } from '@angular/common/http';
import { Perfis } from 'src/app/modules/administracao/models/perfis';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http: HttpClient) { }

  getMenusByProfileIdAndSystemId(profileId: any, systemId: any): Observable<Menu[]>{
    console.log(profileId)
    return this.http.get<Menu[]>(`${environment.baseUrl}/list_menus?profile_id=${profileId}&system_id=${systemId}`);
  }

  getMenu(): Observable<ManterMenu[]>{
    return this.http.get<ManterMenu[]>(`${environment.baseUrl}/menus`);
  }

  getMenuById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/menus/${id}`);
  }

  saveMenu(menu: any){
    return this.http.post<any>(`${environment.baseUrl}/menus`, menu);
  }

  updateMenu(menu: any){
    return this.http.put<any>(`${environment.baseUrl}/menus/${menu.id}`, menu);
  }

  deleteMenu(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.baseUrl}/menus/${id}`);
  }

  getController(): Observable<any[]>{
    return this.http.get<any[]>(`${environment.baseUrl}/controllers`);
  }

}
