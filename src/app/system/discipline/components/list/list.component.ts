import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {AlertService} from '../../../../shared/services/alert.service';
import {DisciplineService} from '../../../services/discipline.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  listColumns: TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: 'Nome',
    },
    {
      index: new Date().toISOString(),
      align: 'align-right',
    }
  ];


  tableData: TableLine[] = [];

  constructor(
    private globalService: GlobalService,
    private alertService: AlertService,
    private disciplineService: DisciplineService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Disciplinas');
    this.disciplineService.getAll().subscribe({
      next: (disciplines: any) => this.feedTable(disciplines),
    });
  }

 async onRemove(disciplineId: string) {
    await this.alertService.alertOptions(`Deseja realmente excluir essa disciplina?`,
      () => {
          this.disciplineService.remove(disciplineId).subscribe({
            next:async () => {
             await this.alertService.toastSuccess('Registro removido com sucesso!');
             location.reload();
            },
            error: err => {
              this.alertService.toastError('Não foi possível remover o registro');
            }
          });
      }
    );
  }

  async onEdit(disciplineId: string) {
    await this.router.navigate([`system/discipline/form/${disciplineId}`]);
  }


  feedTable(disciplines:any) {
    for (const discipline of disciplines) {
      const fields: TableData[] = [];
      const field: TableData = {
        index: new Date().toISOString(),
        value: discipline.name
      };
      const lineActions: TableData = {
        index: new Date().toISOString(),
        classes: ['align-right'],
        buttons: [
          {
            index: new Date().toISOString(),
            classes: ['btn-edit'],
            icon: 'fi fi-rr-pencil',
            onClick: async () => this.onEdit(discipline.id),
          },
          {
            index: new Date().toISOString(),
            classes: ['btn-remove'],
            icon: 'fi fi-rr-trash',
            onClick: async () => await this.onRemove(discipline.id)
          }
        ]
      };
      fields.push(field);
      fields.push(lineActions);
      this.tableData.push({
        index: Date.toString(),
        fields: fields
      });
    }
  }

}
