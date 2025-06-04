import { Component } from '@angular/core';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  formGroup: FormGroup;
  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.formGroup = formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }


  async onSubmit() {
    if (this.formGroup.invalid) {
      await this.alertService.toastError("Login ou senha inválidos");
    } else {
      this.authService.login(this.formGroup.value).subscribe({
        next:async (response:any) => {
          this.authService.storeToken(response.token);
          await this.alertService.toastSuccess("Logado com sucesso!");
          await this.router.navigate(['/']);
        },
        error:async () => {
          await this.alertService.toastError("Login ou senha inválidos");

        }
      });
    }
  }
}
