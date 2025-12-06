import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class DisciplineService {

  constructor(
    private http: HttpClient,
  ) {}
  readonly baseUrl: string = `${config.api_host}/management/discipline`;

  register(formData: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrl}/create`, formData, {headers: headers});
  }
  update(disciplineId: string, formData: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.baseUrl}/update/${disciplineId}`, formData, {headers: headers});
  }

  getAll() {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}`, {headers: headers});
  }

  remove (disciplineId: string) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.baseUrl}/remove/${disciplineId}`, {headers: headers});
  }

  findOne(disciplineId: string) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.baseUrl}/${disciplineId}`, {headers: headers});
  }
}
