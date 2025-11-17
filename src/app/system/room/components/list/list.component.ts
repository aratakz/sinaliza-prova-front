import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {RoomService} from '../../../services/room.service';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {Router} from '@angular/router';
import {AlertService} from '../../../../shared/services/alert.service';
import {AuthService} from '../../../../auth/services/auth.service';
import {AccessLevel} from '../../../enums/AccessLevel';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  tableColumns: TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: 'Nome',
      align: 'align-left',
    },
    {
      index: new Date().toISOString(),
      title: '',
      align: 'align-right',
    }
  ];
  tableData: TableLine[] = [];



  rooms:Array<any> = [];

  constructor(
    private globalService: GlobalService,
    private roomService: RoomService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  user: any;

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Turmas');
    this.user = this.authService.userData;
    this.user = JSON.parse(this.user);
    this.roomService.list().subscribe({
      next: (rooms: any) => this.feedTable(rooms),
    });
  }

  feedTable(rooms:any) {
    for (const room of rooms) {
      const fields: TableData[] = [];
      const field: TableData = {
        index: new Date().toISOString(),
        value: room.name
      };
      const lineActions: TableData = {
        index: new Date().toISOString(),
        classes: ['align-right'],
        buttons: [
          {
            index: new Date().toISOString(),
            classes: ['btn-edit'],
            icon: 'fi fi-rr-pencil',
            onClick: async () => this.onEdit(room.id),
          },
          {
            index: new Date().toISOString(),
            classes: ['btn-remove'],
            icon: 'fi fi-rr-trash',
            onClick: async () => await this.onRemove(room.id)
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

  async onRemove(roomId:string) {
    await this.alertService.alertOptions(`Deseja realmente excluir essa turma?`,
      () => {
        this.roomService.remove(roomId).subscribe({
          next: async () => {
           await this.alertService.toastSuccess('Registro removido com sucesso!');
           location.reload();
          },
          error: async (error: any) => {
            await this.alertService.toastError('Não foi possível remover o registro');
          }
        });
      }
    );
  }

  async onEdit(disciplineId: string) {
    await this.router.navigate([`system/room/form/${disciplineId}`])
  }

  protected readonly AccessLevel = AccessLevel;
}
