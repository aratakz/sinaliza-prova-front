import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  readonly baseUrl: string = `${config.api_host}/questions`;
  readonly baseUrlMedia: string = `${config.api_host}/system`;
  readonly token = window.localStorage.getItem('token') || '';
  readonly headers = new HttpHeaders({
    'Authorization': `Bearer ${this.token}`,
  });

  constructor(private http: HttpClient) { }

  register(body: any) {
    this.headers.append('Content-Type', 'multipart/form-data');
    return this.http.post(`${this.baseUrl}/register`, body, {headers: this.headers});
  }

  list() {
    return this.http.get(`${this.baseUrl}/list`, {headers: this.headers});
  }

  remove(questionId: string) {
    return this.http.delete(`${this.baseUrl}/${questionId}`, {headers: this.headers});
  }

  findOne(questionId: string) {
    return this.http.get(`${this.baseUrl}/find/${questionId}`, {headers: this.headers});
  }

  findByTitle(search: string) {
    return this.http.get(`${this.baseUrl}/search/?search=${search}`, {headers: this.headers});
  }

  update(questionId: string, question: any) {
    return this.http.patch(`${this.baseUrl}/update/${questionId}`, question, {headers: this.headers});
  }

  async saveFieldVideo(values: any) {
    return await fetch(`${this.baseUrlMedia}/media/field/video`, {
      method:"POST",
      body: values.video,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Authorization': `Bearer ${this.token}`,
      }
    })
  };

  getFieldVideo(fieldId: any) {
    return this.http.get(`${this.baseUrlMedia}/loadVideo/${fieldId}`, {headers: this.headers});
  };
}
