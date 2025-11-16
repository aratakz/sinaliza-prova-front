import {Component, OnInit} from '@angular/core';
import {TableColumn, TableData, TableLine} from '../../../../@types';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent  implements OnInit {

  ngOnInit(): void {
    this.feedTable([]);
  }


  tableColumns:TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: ""
    },
    {
      index: new Date().toISOString(),
      title: "Nome"
    },
    {
      index: new Date().toISOString(),
      title: "Permissões"
    },
    {
      index: new Date().toISOString(),
      title: "Usuários"
    },
    {
      index: new Date().toISOString(),
      title: ""
    }
  ];

  tableLines: TableLine[] = [];

  feedTable(profiles:any) {
    let title: TableData | null = null;
    this.tableLines.push({
      index: new Date().toISOString(),
      fields: [
        {
          index: new Date().toISOString(),
          icon: 'fi fi-rr-shield-check',
          classes: ['align-center'],
        }
      ]
    });
  }
  async onRemove(questionId:any) {

  }
  async onEdit(questionId:any) {

  }
}
