import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  constructor(
    private globalService: GlobalService,
  ) {}
  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Turmas');
  }

}
