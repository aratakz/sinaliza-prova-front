import { Injectable } from '@angular/core';
import {config} from '../../../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {lastValueFrom, Observable} from 'rxjs';
import {AlertService} from '../../shared/services/alert.service';
import {Router} from '@angular/router';

@Injectable()
export class AuthService {
  readonly baseUrl = `${config.api_host}/auth`;

  constructor(
    private alertService: AlertService,
    private http: HttpClient,
    private router: Router,
    ) {}


  login(loginData: any):Observable<Object> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.http.post(`${this.baseUrl}/signin`, JSON.stringify(loginData), { headers: headers });
  }

  storeToken(token: string):void{
    const tokenPayloadEncoded = token.split('.')[1];
    const userDataObject = JSON.parse(atob(tokenPayloadEncoded)).userData;
    window.localStorage.setItem('userData', JSON.stringify(userDataObject));
    window.localStorage.setItem('token', token);
  }

  async destroyToken(): Promise<void> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    if (window.localStorage.getItem('token')) {
      await lastValueFrom(this.http.request('delete',`${this.baseUrl}/logout`, {
        body: JSON.stringify({token: window.localStorage.getItem('token')}),
        headers: headers
      })).then(() => {
        window.localStorage.removeItem('token');
      }).catch(async () => {
          await this.alertService.toastError('Não foi possível realizar o logout.');
          throw Error('cannot leave');
      });
    }
  }
  requestChangePass(formData: any) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/JSON' });
    return this.http.post(`${this.baseUrl}/requestPassChange`, JSON.stringify(formData), {headers: headers});
  }

  get userData ():string|null {
    return window.localStorage.getItem('userData');
  }

  async logout() {
    await this.destroyToken();
    await this.router.navigate(['/']);
  }

  checkToken(token:string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/checkTwoFactorToken/${token}`);
  }
  activate(token:string):Observable<any> {
    return this.http.patch(`${this.baseUrl}/activate/${token}`, {});

  }
}
