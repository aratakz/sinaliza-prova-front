import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {UserData} from '../../../shared/types';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    loggedUser: string = '';
    showNotification: string|boolean =  '';

    constructor(
      private authService: AuthService,
      private router: Router,
      private alertService: AlertService) {
    }
    ngOnInit(): void {
      this.loggedUser = this.parseUserName();
    }
    async logout() {
      await this.alertService.alertOptions(async () =>  {
        this.authService.destroyToken().then(async () => {
          await this.router.navigate(['../auth']);
          await this.alertService.toastSuccess('Logout realizado com sucesso!');

        });
      });
    }

  parseUserName (): string {
    let parseName = '';
    if (this.authService.userData) {
      const parseUser:UserData =  JSON.parse(this.authService.userData);
      const sliceUserName = parseUser.name.split(' ');
      for (const slug of sliceUserName) {
        parseName = parseName +  slug.charAt(0).toUpperCase() + slug.slice(1) + " ";
      }
    }
    return parseName;
  }

  displayNotifications() {
      if (this.showNotification === '') {
        this.showNotification = 'active';
      } else {
        this.showNotification = '';
      }
  }
}
