import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrl = `${config.api_host}/auth`;

  constructor(private http : HttpClient) { }

  registerStudent(registerData: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });

    return this.http.post(`${this.baseUrl}/register`, JSON.stringify(registerData), {headers: headers});
  }
}
