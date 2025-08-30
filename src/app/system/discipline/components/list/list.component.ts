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
  listColumns: TableColumn[] = [
    {
      index: new Date().toISOString(),
      title: 'Nome',
    },
    {
      index: new Date().toISOString(),
      title: 'Ações',
      align: 'align-center',
    }
  ];
  constructor(
    private globalService: GlobalService,
  ) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Disciplinas');
  }

}
