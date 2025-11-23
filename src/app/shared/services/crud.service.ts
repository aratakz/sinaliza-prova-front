import { Injectable } from '@angular/core';
import {ListService} from './list.service';
import {RemoveService} from './remove.service';
import {FindService} from './find.service';
import {FormService} from './form.service';

@Injectable({
  providedIn: 'root'
})
export class CrudService {



  constructor(
    private listService: ListService,
    private removeService: RemoveService,
    private findService: FindService,
    private formService: FormService
  ) {}

  get list() {
    return this.listService;
  }
  get remove() {
    return this.removeService;
  }
  get find() {
    return this.findService;
  }
  get form() {
    return this.formService;
  }
}
