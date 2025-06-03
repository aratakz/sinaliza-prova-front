import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  formGroup: FormGroup;


  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
    this.formGroup = formBuilder.group({
      login: ['', [Validators.required, Validators.minLength(8)]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      institute: ['', [Validators.required]],
    })
  }

  async onSubmit() {
    if (!this.formGroup.valid) {
      await this.displayErrors();
    }
  }

  private async displayErrors() {
    for (let control in this.formGroup.controls) {
      if (this.formGroup.controls[control].errors && this.formGroup.controls[control].errors['required']) {
        let fieldName = "";
        switch (control) {
          case 'email':
            fieldName = "email";
            break;
          case 'password':
            fieldName = "senha";
            break;
          case 'login':
            fieldName = "login";
            break;
          case  'name':
            fieldName = "nome completo"
            break;
          case 'confirmPassword':
            fieldName = "confirmar senha"
            break;
          case 'birthday':
            fieldName = "Data de nascimento"
            break;
          case "institute":
            fieldName = "instituição"
        }
        await this.alertService.toastError(`Atenção! O campo ${fieldName} não foi preenchido!`);
        break;
      }
      if (this.formGroup.controls[control].errors && this.formGroup.controls[control].errors['email']) {
        await this.alertService.toastError(`Atenção! Email inválido informado!`);
        break;
      }
      if (this.formGroup.controls['login'].errors && this.formGroup.controls['login'].errors['minlength']) {
        await this.alertService.toastError(`O login pelo menos 8 caracteres.`);
        break;
      }
      if (this.formGroup.controls['password'].errors && this.formGroup.controls['password'].errors['minlength']) {
        await this.alertService.toastError(`A senha deve conter pelo menos 8 caracteres.`);
        break;
      }
      if (this.formGroup.controls['password'].value != this.formGroup.controls['confirmPassword'].value) {
        await this.alertService.toastError(`As senhas não são iguais`);
        break;
      }

    }
  }
}
