import {Component, OnInit} from '@angular/core';
import {GlobalService} from '../../../services/global.service';
import {InstituteService} from '../../../../shared/services/institute.service';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
    institutes: Array<any> = [];

    constructor(
      private globalService: GlobalService,
      private instituteService: InstituteService,
    ) {
      globalService.actionControlBehavior.next(true);
    }

  ngOnInit(): void {
      this.instituteService.getAll().subscribe({
        next: async (response: any) => {
          for (const institute of response) {
            this.institutes.push(institute);
          }
        }
      })
  }


}
