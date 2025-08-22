import { Injectable } from '@angular/core';
import {config} from '../../../config';
import {HttpClient, HttpResponse} from '@angular/common/http';
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
}
