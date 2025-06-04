import { Component } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(
      private authService: AuthService,
      private router: Router,) {
    }
    async logout() {
      this.authService.destroyToken();
      await this.router.navigate(['../auth']);
    }
}
