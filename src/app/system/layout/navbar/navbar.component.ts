import { Component } from '@angular/core';
import {GlobalService} from '../../services/global.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    collapseControl = '';
    isCollapsed = false;
    collapseStatus = 'collapse-off';

    menuControls = {
      security: {
        show:  false
      }
    }

    constructor(private globalService: GlobalService ) {
      if (window.localStorage.getItem("collapse")) {
        this.collapseControl = 'collapse';
        this.isCollapsed = true;
      }
      globalService.navbarBehavior.next(this.collapseControl)
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
}
