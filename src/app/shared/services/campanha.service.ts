import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Campaign } from 'src/app/modules/campanha/models/campaign';
import { Banner } from 'src/app/modules/campanha/models/banner';
import { Ask } from 'src/app/modules/campanha/models/ask';
import { Survey } from 'src/app/modules/campanha/models/survey';
import { Answer } from 'src/app/modules/campanha/models/answer';

@Injectable({
  providedIn: 'root'
})
export class CampanhaService {

  constructor(private http: HttpClient) { }

  //Campanha

  getCampaigns(): Observable<Campaign[]>{
    return this.http.get<Campaign[]>(`${environment.baseUrl}/campaigns`);
  }

  getCampaignById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/campaigns/${id}`);
  }

  saveCampaign(campaign: any){
    return this.http.post<any>(`${environment.baseUrl}/campaigns`, campaign);
  }

  updateCampaign(campaign: any){
    return this.http.put<any>(`${environment.baseUrl}/campaigns/${campaign.id}`, campaign);
  }

  deleteCampaign(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.baseUrl}/campaigns/${id}`);
  }

  //Banner

  getBanners(): Observable<Banner[]>{
    return this.http.get<Banner[]>(`${environment.baseUrl}/banners`);
  }

  getBannerById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/banners/${id}`);
  }

  saveBanner(banner: any){
    return this.http.post<any>(`${environment.baseUrl}/banners`, banner);
  }

  updateBanner(banner: any){
    return this.http.put<any>(`${environment.baseUrl}/banners/${banner.id}`, banner);
  }

  deleteBanner(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.baseUrl}/banners/${id}`);
  }

  //Questionário

  getSurveys(): Observable<Survey[]>{
    return this.http.get<Survey[]>(`${environment.baseUrl}/surveys`);
  }

  getSurveyById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/surveys/${id}`);
  }

  saveSurvey(survey: any){
    return this.http.post<any>(`${environment.baseUrl}/surveys`, survey);
  }

  updateSurvey(survey: any){
    return this.http.put<any>(`${environment.baseUrl}/surveys/${survey.survey.id}`, survey);
  }

  deleteSurvey(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.baseUrl}/surveys/${id}`);
  }

  getSurveysActive(): Observable<Survey[]>{
    return this.http.get<Survey[]>(`${environment.baseUrl}/surveys_active`);
  }

  //Pergunta

  getAsks(): Observable<Ask[]>{
    return this.http.get<Ask[]>(`${environment.baseUrl}/asks`);
  }

  getAskById(id:any): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/asks/${id}`);
  }

  saveAsk(ask: any){
    return this.http.post<any>(`${environment.baseUrl}/asks`, ask);
  }

  updateAsk(ask: any){
    return this.http.put<any>(`${environment.baseUrl}/asks/${ask.id}`, ask);
  }

  deleteAsk(id:number):Observable<void>{
    return this.http.delete<void>(`${environment.baseUrl}/asks/${id}`);
  }

  // Respostas

  getAnswerById(id: any):Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/answers/${id}`);
  }

  findAnswers(answer: any):Observable<Answer[]>{
    return this.http.post<Answer[]>(`${environment.baseUrl}/find_answers`, answer);
  }

  saveAnswer(answer: any){
    return this.http.post<any>(`${environment.baseUrl}/answers`, answer);
  }

  deleteAnswers(answer: any){
    return this.http.delete<any>(`${environment.baseUrl}/delete_answers`, answer);
  }

  // Opções de Resposta

  deleteAnswerOptions(ids:[]){

    ids.forEach(id => this.http.delete<void>(`${environment.baseUrl}/answer_options/${id}`).subscribe());

  }



}






