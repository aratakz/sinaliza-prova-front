import { Component } from '@angular/core';
import {History} from '../../../shared/types';
@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  historyCollection: Array<History> = [{
    id: 'asa'
  }];
  protected readonly history = history;
}
