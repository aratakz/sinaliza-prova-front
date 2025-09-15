import {Component, OnInit} from '@angular/core';
import {TableColumn, TableData, TableLine} from '../../../../@types';
import {AlertService} from '../../../../shared/services/alert.service';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(
    private alertService: AlertService,
    private questionService: QuestionService
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
    })
  }

  feedTable(questions:any) {
    for (const discipline of questions) {
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
      this.tableLines.push({
        index: Date.toString(),
        fields: fields
      });
    }
  }

  async onRemove(questionId:any) {

  }
  async onEdit(questionId:any) {}
}
