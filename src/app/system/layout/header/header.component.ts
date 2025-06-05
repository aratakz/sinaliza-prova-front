import { Component } from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
    constructor(
      private authService: AuthService,
      private router: Router,
      private alertService: AlertService) {
    }
    async logout() {
      this.authService.destroyToken().then(async () => {
        await this.router.navigate(['../auth']);
        await this.alertService.toastSuccess('Logout realizado com sucesso!');

      });
    }
}
