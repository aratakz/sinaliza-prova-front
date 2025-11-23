import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {CrudService} from '../../../../shared/services/crud.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
    institutes: Array<any> = [];

    constructor(
      private globalService: GlobalService,
      private alertService: AlertService,
      private crudService: CrudService
    ) {
      globalService.actionControlBehavior.next(true);
    }

  async ngOnInit(): Promise<void> {
      this.globalService.activeRouteBehavior.next("Instituições");
      const list:any = await this.crudService.list.listInstitutes();
      await this.feedTable(list);
  }

  async feedTable(list:any) {
    for (const institute of list) {
      this.institutes.push(institute);
    }
  }
  async remove(id: any) {
    await this.alertService.alertOptions('Deseja realmente excluir essa instituição?',
      async () => {
        await this.crudService.remove.removeInstitute(id);
        location.reload();
      });
  }
}
