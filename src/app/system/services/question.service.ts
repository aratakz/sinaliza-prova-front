import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  readonly baseUrl: string = `${config.api_host}/questions`;
  readonly token = window.localStorage.getItem('token') || '';
  readonly headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) { }

  register(body: any) {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseUrl}/register`, body, {headers: this.headers});
  }
}
