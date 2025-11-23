import { Injectable } from '@angular/core';
import {InstituteService} from './institute.service';
import {lastValueFrom} from 'rxjs';
import {AlertService} from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class FindService {

  constructor(
    private instituteService: InstituteService,
    private alertService: AlertService
  ) { }

  async findInstituteById(id: any) {
    return lastValueFrom(this.instituteService.findById(id))
      .catch(async () =>
        await this.alertService.toastError("Não foi possível carregar o registro"));
  }
}
