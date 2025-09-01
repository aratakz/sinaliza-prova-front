import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {TableColumn} from '../../../../@types';

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
  ]
  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Alunos');
    throw new Error('Method not implemented.');
  }



}
