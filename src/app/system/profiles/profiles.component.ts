import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-profiles',
  standalone: false,
  templateUrl: './profiles.component.html',
  styleUrl: './profiles.component.scss'
})
export class ProfilesComponent implements OnInit {
  constructor(private globalService: GlobalService) {}

  ngOnInit(): void {
    this.globalService.activeRouteBehavior.next('Perfis de acesso');
  }


}
