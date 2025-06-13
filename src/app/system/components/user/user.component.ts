import {Component, OnDestroy} from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnDestroy {
  constructor(private globalService: GlobalService) {
    this.globalService.activeRouteBehavior.next('Dados Cadastrais');
  }

  ngOnDestroy(): void {
    this.globalService.activeRouteBehavior.next('');
  }
}
