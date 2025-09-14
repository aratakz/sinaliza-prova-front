import {Component, OnInit} from '@angular/core';
import {TableColumn} from '../../../../@types';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor() {}

  tableColumns:TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: "Título"
    },
    {
      index: new Date().toISOString(),
      title: ""
    }
  ]

  ngOnInit(): void {

  }

}
