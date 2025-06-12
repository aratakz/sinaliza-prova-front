import {Component, OnInit} from '@angular/core';
import {GlobalService} from './services/global.service';

@Component({
  selector: 'app-system',
  standalone: false,
  templateUrl: './system.component.html',
  styleUrl: './system.component.scss'
})
export class SystemComponent  implements OnInit {
  collapse =  '';

  constructor(private  globalService: GlobalService) {
  }

  ngOnInit(): void {
       this.globalService.navbarBehavior.subscribe({
         next: (navbarStatus) => {
           this.collapse = navbarStatus;
         }
       });
    }
}
