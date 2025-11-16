import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../services/global.service';
import {AuthService} from '../../../auth/services/auth.service';
import {AccessLevel} from '../../enums/AccessLevel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  collapseControl = '';
  isCollapsed = false;
  collapseStatus = 'collapse-off';
  user: any;


  menuControls = {
    security: {
      show:  false
    }
  }

  constructor(
    private globalService: GlobalService,
    private authService: AuthService,
    private router: Router,
  ) {
    if (window.localStorage.getItem("collapse")) {
      this.collapseControl = 'collapse';
      this.isCollapsed = true;
      this.collapseStatus = 'collapse-on';
    }
    globalService.navbarBehavior.next(this.collapseControl)
  }

  ngOnInit(): void {
    this.user = this.authService.userData;
    this.user = JSON.parse(this.user);

    const secSectionList = [
      '/system/access/list',
      '/system/profiles/list'
    ];

    if (secSectionList.includes(this.router.url)) {
      this.menuControls.security.show = true;
    }
  }

  collapse() {
    if (!this.isCollapsed) {
      this.isCollapsed = true;
      this.collapseControl = 'collapse';
      this.collapseStatus = 'collapse-on';
      window.localStorage.setItem('collapse', JSON.stringify(this.isCollapsed));
      this.globalService.navbarBehavior.next(this.collapseControl);
    } else {
      this.isCollapsed = false;
      this.collapseControl = '';
      this.collapseStatus = 'collapse-off';
      window.localStorage.removeItem('collapse');
      this.globalService.navbarBehavior.next(this.collapseControl);
    }
  }

  collapseMenu(controlKey:string) {
    // @ts-ignore
    this.menuControls[`${controlKey}`].show = !this.menuControls[`${controlKey}`].show;
  }

  protected readonly AccessLevel = AccessLevel;
}
