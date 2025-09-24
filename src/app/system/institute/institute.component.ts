import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {GlobalService} from '../services/global.service';

@Component({
  selector: 'app-institute',
  standalone: false,
  templateUrl: './institute.component.html',
  styleUrl: './institute.component.scss'
})
export class InstituteComponent {
  showButtons:boolean = false;

  constructor(
    private router: Router,
    private globalService: GlobalService,
    ) {
    globalService.actionControlBehavior.subscribe((actionControl: boolean) => {
      this.showButtons = false;
    });
  }
}
