import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  constructor(
    private http: HttpClient,
  ) { }

  readonly baseURL = `${config.api_host}/exams`;

  create(formData: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });

   return  this.http.post(`${config.api_host}/exams/create`, formData, {headers: headers});
  }

  list() {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });

   return  this.http.get(`${config.api_host}/exams/list`, {headers: headers});
  }

  findOne(id: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });

   return  this.http.get(`${config.api_host}/exams/find/${id}`, {headers: headers});
  }

}
