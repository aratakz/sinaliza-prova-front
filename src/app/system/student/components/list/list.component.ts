import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {userInfo} from 'node:os';
import {AuthService} from '../../../../auth/services/auth.service';

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
    },
    {
      index: new Date().toISOString(),
      title: 'Email',
    },
    {
      index: new Date().toISOString(),
      title: '',
    }
  ];
  tableLines:TableLine[] = [];

  constructor(
    private globalService: GlobalService,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Alunos');
    this.userService.getAllStudents().subscribe({
      next: (data:any) => this.feedTable(data)
    })
    throw new Error('Method not implemented.');
  }

   feedTable(students:any) {

    let  loggedUserData:any = '';
    if (this.authService.userData) {
      loggedUserData = JSON.parse(this.authService.userData);
    }

    for (const student of students) {
      if (student.id == loggedUserData.id) {
        continue;
      }

      const fields: TableData[] = [];
      const nameField: TableData = {
        index: new Date().toISOString(),
        value: student.name
      };
      const emailField: TableData = {
        index: new Date().toISOString(),
        value: student.email
      };
      const lineActions: TableData = {
        index: new Date().toISOString(),
        classes: ['align-right'],
        buttons: [
          {
            index: new Date().toISOString(),
            classes: ['btn-edit'],
            icon: 'fi fi-rr-pencil',
            onClick: async () => this.onEdit(student.id),
          },
          {
            index: new Date().toISOString(),
            classes: ['btn-remove'],
            icon: 'fi fi-rr-trash',
            onClick: async () => await this.onRemove(student.id)
          }
        ]
      };
      fields.push(nameField);
      fields.push(emailField);
      fields.push(lineActions);
      this.tableLines.push({
        index: Date.toString(),
        fields: fields
      });
    }
  }

  onEdit(userId:string) {}

  async onRemove(userId:string) {
    await this.alertService.alertOptions(`Deseja realmente excluir esse aluno?`,
      () => {
        this.userService.remove(userId).subscribe({
          next: async () => {
            await this.alertService.toastSuccess('Registro removido com sucesso!');
            location.reload();
          },
          error: err => {
            this.alertService.toastError('Não foi possível remover');
          }
        });
      }
    );
  }
}
