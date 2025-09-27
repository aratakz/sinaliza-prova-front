import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {config} from '../../../config';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  readonly baseUrlAuth = `${config.api_host}/auth`;
  readonly baseUrlUsers = `${config.api_host}/users`;
  avatarSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient) {
  }

  registerStudent(registerData: any) {
    let headers = new HttpHeaders({'Content-Type': 'application/JSON'});
    return this.http.post(`${this.baseUrlAuth}/student/firstLogin`, JSON.stringify(registerData), {headers: headers});
  }

  getUseData() {
    const userData = window.localStorage.getItem('userData') || '';
    const token = window.localStorage.getItem('token') || '';
    const userDataObject = JSON.parse(userData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });

    return this.http.get(`${this.baseUrlUsers}/userdata/${userDataObject.id}`, {headers: headers});
  }

  update(userData: any) {

    const storedUserData = window.localStorage.getItem('userData') || '';
    const token = window.localStorage.getItem('token') || '';
    const userDataObject = JSON.parse(storedUserData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.baseUrlUsers}/update/${userDataObject.id}`, userData, {headers: headers});
  }

  updateUser(userData: any) {

    const storedUserData = window.localStorage.getItem('userData') || '';
    const token = window.localStorage.getItem('token') || '';
    const userDataObject = JSON.parse(storedUserData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.patch(`${this.baseUrlUsers}/update/${userDataObject.id}`, userData, {headers: headers});
  }

  checkUsername(text: string) {
    return this.http.get(`${this.baseUrlUsers}/checkUsername/${text}`);
  }
  getAvatar(avatarLink: string) {
    const storedUserData = window.localStorage.getItem('userData') || '';
    const token = window.localStorage.getItem('token') || '';
    const userDataObject = JSON.parse(storedUserData);

    const headers = new HttpHeaders({
      'Content-Type': 'application/JSON',
      'Authorization': `Bearer ${token}`,
    });
    return this.http.post(`${this.baseUrlUsers}/avatarLink/`, {avatarLink: avatarLink}, {headers: headers});
  }
}
