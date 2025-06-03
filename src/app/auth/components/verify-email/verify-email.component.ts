import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    ) {
    this.formGroup = formBuilder.group({
      email: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    await this.router.navigate(['auth/send-email'], {
        queryParams: {
          message:"Enviamos um e-mail  com as instruções de recuperação para",
          email: this.formGroup.value.email,
        }
      });
  }
}
