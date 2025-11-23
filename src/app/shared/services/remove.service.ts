import { Injectable } from '@angular/core';
import {InstituteService} from './institute.service';
import {lastValueFrom} from 'rxjs';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class RemoveService {

  constructor(
    private instituteService: InstituteService,
    private alertService: AlertService
  ) { }

  async removeInstitute(id: any) {
    await lastValueFrom(this.instituteService.remove(id))
      .catch(async () =>
        await this.alertService.toastError('Não foi possível remover a instituição.'));
    await this.alertService.toastSuccess('Registro removido com sucesso!');
  }
}
