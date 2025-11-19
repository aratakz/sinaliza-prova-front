import {Component, Input, OnInit} from '@angular/core';
import {TableColumn, TableData, TableLine} from '../../../@types';

@Component({
  selector: 'app-table-list',
  standalone: false,
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.scss'
})
export class TableListComponent implements OnInit {

  @Input({required: true}) tableColumns: TableColumn[] = [];
  @Input() tableLines: TableLine[] = [];
  @Input() permissions: Array<any> = [];
  @Input() access: any;

  ngOnInit(): void {}
}
