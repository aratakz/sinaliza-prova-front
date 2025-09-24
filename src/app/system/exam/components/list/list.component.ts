import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {TableColumn} from '../../../../@types';

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
      title: "Resultado"
    },
    {
      index: new Date().toISOString(),
      title: ""
    }
  ]

  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Provas');
  }


}
