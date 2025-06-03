import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-send-email',
  standalone: false,
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss'
})
export class SendEmailComponent {
    message: string|null;
    email: string|null;
    constructor(
      private router: Router,
      private activatedRoute: ActivatedRoute,
    ) {
      this.message = activatedRoute.snapshot.queryParamMap.get('message');
      this.email = activatedRoute.snapshot.queryParamMap.get('email');
    }
}
