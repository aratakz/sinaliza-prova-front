import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {ExamService} from '../../../services/exam.service';
import {AlertService} from '../../../../shared/services/alert.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../auth/services/auth.service';
import {AccessLevel} from '../../../enums/AccessLevel';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent  implements OnInit {

  tableColumns:TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: "Título"
    },
    {
      index: new Date().toISOString(),
      title: "Data"
    },
    {
      index: new Date().toISOString(),
      title: "Turma"
    },
    {
      index: new Date().toISOString(),
      title: ""
    }
  ]
  tableLines: TableLine[] = [];
  user:any;


  constructor(
    private globalService: GlobalService,
    private examService: ExamService,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    ) {}

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.user = JSON.parse(this.user);


    this.globalService.activeRouteBehavior.next('Provas');
    this.examService.list().subscribe({
      next: (response: any) => {
        this.feedTable(response);
      }
    });
  }

  feedTable(questions:any) {
    let title: TableData|null = null;

    for (const question of questions) {
      const fields: TableData[] = [];
      const lineActions: TableData = {
        index: new Date().toISOString(),
        classes: ['align-right'],
        buttons: []
      };
      if ([
        AccessLevel.ADMIN,
        AccessLevel.TEACHER,
        AccessLevel.PROFESSIONAL
      ].includes(this.user.access)) {
        lineActions.buttons?.push({
          index: new Date().toISOString(),
          classes: ['btn-remove'],
          icon: 'fi fi-rr-trash',
          onClick: async () => await this.onRemove(question.id)
        });
      }
      if ([AccessLevel.STUDENT].includes(this.user.access)) {
          lineActions.buttons?.push({
            index: new Date().toISOString(),
            classes: ['btn-middle'],
            icon: 'fi fi-rr-test',
            onClick: async () => this.onTestStart(question.id),
          })
      }

      fields.push({
        index: new Date().toISOString(),
        value: question.title
      });
      fields.push({
        index: new Date().toISOString(),
        value: question.date
      });
      fields.push({
        index: new Date().toISOString(),
        value: 'Turma'
      });
      fields.push(lineActions);


      this.tableLines.push({
        index: Date.toString(),
        fields: fields
      });
    }
  }

  async onRemove(questionId:any) {
    await this.alertService.alertOptions(`Deseja realmente excluir essa disciplina?`,
      () => {
        this.examService.remove(questionId).subscribe({
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
  async onEdit(questionId:any) {
    await this.router.navigate([`system/exams/form/${questionId}`]);
  }

  protected readonly AccessLevel = AccessLevel;

  async onTestStart(examId: string) {
    await this.router.navigate([`exam/${examId}`]);
  }
}
