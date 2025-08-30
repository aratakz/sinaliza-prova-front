import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute} from '@angular/router';
import {isValidDate} from 'rxjs/internal/util/isDate';

@Component({
  selector: 'app-activate',
  standalone: false,
  templateUrl: './activate.component.html',
  styleUrl: './activate.component.scss'
})
export class ActivateComponent implements OnInit {

    validToken= false;
    constructor(
      private authService: AuthService,
      private route: ActivatedRoute,
    ) {}

    ngOnInit(): void {
      const token = this.route.snapshot.paramMap.get('token');
      if (token) {
        this.authService.checkToken(token).subscribe({
          next: (response) => {
            this.authService.activate(token).subscribe({
             next: (result) => {
                this.validToken = true;
             },
             error: (err) => {
               this.validToken = false;
             }
            });
          },
          error: (error) => {
            this.validToken = false;
          }
        });
      }
    }

  protected readonly isValidDate = isValidDate;
}
