import { Injectable } from '@angular/core';
import {lastValueFrom} from 'rxjs';
import {InstituteService} from './institute.service';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(
    private instituteService: InstituteService,
    private alertService: AlertService
  ) { }

  async listInstitutes() {
    return await lastValueFrom(this.instituteService.getAll())
      .catch(async () =>
        await this.alertService.toastError("Não foi possível carregar a listagem"));
  }
}
