import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  readonly token = window.localStorage.getItem('token') || '';
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/JSON',
    'Authorization': `Bearer ${this.token}`,
  });
  readonly baseUrl: string = `${config.api_host}/room`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get(`${this.baseUrl}`, {headers: this.headers});
  }

  create(formData: any) {
    return this.http.post(`${this.baseUrl}/register`, formData , {headers: this.headers});
  }
  findById(id: string) {
    return this.http.get(`${this.baseUrl}/${id}`, {headers: this.headers});
  }
  update (id: string, formData: any) {
    return this.http.patch(`${this.baseUrl}/update/${id}`, formData, {headers: this.headers});
  }

  remove(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`, {headers: this.headers});
  }
}


