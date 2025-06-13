import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {UserService} from '../../../auth/services/user.service';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnDestroy, OnInit {

  user: any;

  constructor(private globalService: GlobalService,
              private userService: UserService) {
    this.globalService.activeRouteBehavior.next('Dados Cadastrais');
  }

  ngOnInit(): void {
    this.userService.getUseData().subscribe({
      next: (userData: any) => {
        this.user = userData.user;
      }
    });
  }

  ngOnDestroy(): void {
    this.globalService.activeRouteBehavior.next('');
  }
}
