import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {InstituteService} from '../../../../shared/services/institute.service';
import {AlertService} from '../../../../shared/services/alert.service';

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
      private instituteService: InstituteService,
      private alertService: AlertService,
    ) {
      globalService.actionControlBehavior.next(true);
    }

  ngOnInit(): void {
      this.instituteService.getAll().subscribe({
        next: async (response: any) => {
          for (const institute of response) {
            this.institutes.push(institute);
          }
        }
      });
  }

  remove(id: any) {
    this.alertService.alertOptions('Deseja realmente excluir essa instinituição?',
      () => {
        this.instituteService.remove(id).subscribe({
          next: async (response: any) => {
            await this.alertService.toastSuccess('Registro removido com sucesso');
            location.reload();
          },
          error: () => {
            this.alertService.toastError('Não foi possível remover o usuário');
          }
        });
      });
  }
}
