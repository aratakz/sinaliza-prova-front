import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth/services/auth.service';
import {Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {UserData} from '../../../shared/types';
import {GlobalService} from '../../services/global.service';
import {UserService} from '../../../auth/services/user.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    loggedUser: string = '';
    showNotification: string|boolean =  '';
    activeRoute: string = '';
    avatarLink: string = '';

    constructor(
      private authService: AuthService,
      private router: Router,
      private alertService: AlertService,
      private globalService: GlobalService,
      private userService: UserService) {
    }
    ngOnInit(): void {
      this.loggedUser = this.parseUserName();
      this.getAvatar();
      this.globalService.activeRouteBehavior.subscribe({
        next: (route) => {
          this.activeRoute = route;
        }
      });
      this.userService.avatarSubject.subscribe({
        next: (link) => {
          this.avatarLink = link
        }
      });
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
  getAvatar ()  {
    if (this.authService.userData) {
      this.userService.getUseData().subscribe({
        next: (userData: any) => {
          this.avatarLink = userData.user.avatar;
        }
      })
    }
  }

  displayNotifications() {
      if (this.showNotification === '') {
        this.showNotification = 'active';
      } else {
        this.showNotification = '';
      }
  }


}
