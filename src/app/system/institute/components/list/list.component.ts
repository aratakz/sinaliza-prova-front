import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {InstituteService} from '../../../../shared/services/institute.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {lastValueFrom} from 'rxjs';
import {ListService} from '../../../../shared/services/list.service';
import {RemoveService} from '../../../../shared/services/remove.service';

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
      private listService: ListService,
      private alertService: AlertService,
      private removeService: RemoveService
    ) {
      globalService.actionControlBehavior.next(true);
    }

  async ngOnInit(): Promise<void> {
      this.globalService.activeRouteBehavior.next("Instituições");
      const list:any = await this.listService.listInstitutes();
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
        await this.removeService.removeInstitute(id);
        await location.reload();
      });
  }
}
