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
  readonly baseUrl: string = `${config.api_host}/disciplines`;

  register(formData: any) {
    const token = window.localStorage.getItem('token') || '';
    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${config.api_host}/disciplines/create`, formData, {headers: headers});
  }
}
