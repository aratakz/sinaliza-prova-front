import { Injectable } from '@angular/core';
import {config} from '../../../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  readonly baseUrl = `${config.api_host}/auth`;
  constructor(private http: HttpClient) { }


  login(loginData: any):Observable<Object> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.http.post(`${this.baseUrl}/signin`, JSON.stringify(loginData), { headers: headers });
  }

  storeToken(token: string):void{
    window.localStorage.setItem('token', token);
  }

  destroyToken():void{
    window.localStorage.removeItem('token');
  }
}
