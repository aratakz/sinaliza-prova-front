import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, take} from 'rxjs';
import {config} from '../../../config';

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {
  readonly token = window.localStorage.getItem('token') || '';
  readonly headers = new HttpHeaders({
    'Content-Type': 'application/JSON',
    'Authorization': `Bearer ${this.token}`,
  });
  readonly baseUrl: string = `${config.api_host}/curriculum`;
  curriculumBehavior: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  constructor(
    private http: HttpClient,
  ) {}

  getByDiscipline(disciplineID: string) {
    return this.http.get(`${this.baseUrl}/${disciplineID}`, {headers: this.headers});
  }
}
