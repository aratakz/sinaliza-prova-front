import {Component, OnInit} from '@angular/core';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {AlertService} from '../../../../shared/services/alert.service';
import {QuestionService} from '../../../services/question.service';
import {Router} from '@angular/router';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private questionService: QuestionService,
    private router: Router,
    private globalService: GlobalService,
  ) {}

  tableColumns:TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: "Nome"
    },
    {
      index: new Date().toISOString(),
      title: "Enunciado"
    },
    {
      index: new Date().toISOString(),
      title: ""
    }
  ]

  tableLines: TableLine[] = [];
  ngOnInit(): void {
    this.questionService.list().subscribe({
      next: (response) => {
        this.feedTable(response);
      }
    });
    this.globalService.activeRouteBehavior.next('Questões')
  }

  feedTable(questions:any) {
    let title: TableData|null = null;

    for (const question of questions) {
      const fields: TableData[] = [];
      const field: TableData = {
        index: new Date().toISOString(),
        value: question.name
      };
      if (question.fields) {
        for (const questionField of question.fields) {
          if (questionField.fieldValue) {
            if (questionField.fieldType == 'title') {
              title = {
                index: questionField.id,
                value: questionField.fieldValue
              };
            }
          }
        }
      }

      const lineActions: TableData = {
        index: new Date().toISOString(),
        classes: ['align-right'],
        buttons: [
          {
            index: new Date().toISOString(),
            classes: ['btn-edit'],
            icon: 'fi fi-rr-pencil',
            onClick: async () => this.onEdit(question.id),
          },
          {
            index: new Date().toISOString(),
            classes: ['btn-remove'],
            icon: 'fi fi-rr-trash',
            onClick: async () => await this.onRemove(question.id)
          }
        ]
      };
      fields.push(field);
      if (title) {
        fields.push(title);
      } else {
        fields.push({
          index: new Date().toISOString(),
          value: ''
        });
      }
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
        this.questionService.remove(questionId).subscribe({
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
    await this.router.navigate([`system/question/form/${questionId}`]);
  }
}
