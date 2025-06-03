import { Component } from '@angular/core';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private alertService: AlertService) { }


  async onSubmit() {
      await this.alertService.toastError("Login ou senha inválidos");
  }
}
