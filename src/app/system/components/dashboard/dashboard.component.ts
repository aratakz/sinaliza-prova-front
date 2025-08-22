import {Component, OnDestroy} from '@angular/core';
import {History} from '../../../shared/types';
import {GlobalService} from '../../services/global.service';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnDestroy{
  historyCollection: Array<History> = [{
    id: 'asa'
  }];
  constructor(private globalService: GlobalService) {
    this.globalService.activeRouteBehavior.next('mural');
  }

  ngOnDestroy(): void {
      this.globalService.activeRouteBehavior.next('');
    }
  protected readonly history = history;
}
