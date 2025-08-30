import { Injectable } from '@angular/core';
import {config} from '../../../config';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class InstituteService {
  readonly instituteURL = `${config.api_host}/institutes`;

  constructor(
    private http: HttpClient,
  ) { }


  getAll(): any {
    return this.http.get(`${this.instituteURL}`);
  }

  register(formValue: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.instituteURL}/create`, JSON.stringify(formValue), {headers: headers});
  }

  searchByText(value: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.instituteURL}/search/${value}`, {headers: headers});
  }

  findById(id: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.get(`${this.instituteURL}/find/${id}`, {headers: headers});
  }

  update (id: any,  formValue: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.put(`${this.instituteURL}/update/${id}`, JSON.stringify(formValue), {headers: headers});
  }

  remove (id: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.delete(`${this.instituteURL}/remove/${id}`, {headers: headers});
  }
}
