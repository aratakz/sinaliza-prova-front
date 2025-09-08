import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent {

  email: string = "";
  formGroup: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private alertService: AlertService,
    ) {
    this.formGroup = formBuilder.group({
      cpf: ['', [Validators.required, Validators.email]],
    })
  }

  async onSubmit() {
    this.authService.requestChangePass(this.formGroup.value).subscribe({
      next: async () => {
        await this.router.navigate(['auth/send-email'], {
          queryParams: {
            message:"Enviamos um e-mail  com as instruções de recuperação para",
            email: this.formGroup.value.email,
          }
        });
      },
      error: async (err) => {
        if (err.status === 404) {
          await this.alertService.toastError('Email informado não localizado');
        }
      }
    });
  }
}
