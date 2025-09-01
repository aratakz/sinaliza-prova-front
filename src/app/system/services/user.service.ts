import { Injectable } from '@angular/core';
import {config} from '../../../config';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly baseUrl: string = `${config.api_host}/users`;
  readonly token = window.localStorage.getItem('token') || '';
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/JSON',
    'Authorization': `Bearer ${this.token}`,

  });

  constructor(
    private http: HttpClient
  ) {}

  register (formData: any) {
    return this.http.post(`${this.baseUrl}/create`, formData, {headers: this.headers});
  }
  getAllStudents() {
    return this.http.get(`${this.baseUrl}/students`, {headers: this.headers});
  }

  remove(userId:string) {
    return this.http.delete(`${this.baseUrl}/students/remove/${userId}`, {headers: this.headers});
  }

  findById(id:string) {
    return this.http.get(`${this.baseUrl}/students/${id}`, {headers: this.headers});
  }
  updateStudent(studentId: string, formData: any) {
    return this.http.patch(`${this.baseUrl}/students/update/${studentId}`, formData,{headers: this.headers});
  }
}
