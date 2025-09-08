import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertService} from '../../../shared/services/alert.service';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {InstituteService} from '../../../shared/services/institute.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup;
  institutes: Array<any> = [];
  selectedInstitute: any;
  showStrength: boolean = false;
  controlPassword: string = '';
  usernameError = false;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private instituteService: InstituteService,
  ) {
    this.formGroup = this.formBuilder.group({
      login: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      institute: ['', [Validators.required]],
    })
  }
  ngOnInit() {}

  async onSubmit() {
    if (!this.formGroup.valid) {
      this.formGroup.enable();
      await this.displayErrors();
    } else {
      let isWeakLength = this.formGroup.controls['password'].value.length <= 8;
      let isWeakLower = !this.formGroup.controls['password'].value.match(/[a-z]+/);
      let isWeakUpper = !this.formGroup.controls['password'].value.match(/[A-Z]+/);
      let isWeakNumbers = !this.formGroup.controls['password'].value.match(/[0-9]+/);
      let isWeakSpecialChars = !this.formGroup.controls['password'].value.match(/[$@#&!]+/);

      if (isWeakLower || isWeakUpper || isWeakNumbers|| isWeakLength || isWeakSpecialChars) {
        await this.alertService.toastError(`Senha fora dos padrões.`);
        this.formGroup.enable();
      } else {
        this.userService.registerStudent(this.formGroup.value).subscribe({
          next: async () => {
            await this.router.navigate(['/auth/send-email'], {
              queryParams: {
                message: "Enviamos um e-mail  com as instruções de ativação para",
                email: this.formGroup.value.email,
              }
            });
          },
          error: (errorResponse: any) => {
            this.formGroup.enable();
            if (errorResponse.status == 422) {
              if (errorResponse.error.message == "pre-registered record") {
                this.alertService.toastError('Usuário não disponível.');
              }
            }
          }
        });
      }

      this.formGroup.disable();
    }
  }

  private async displayErrors() {
    for (let control in this.formGroup.controls) {
      if (this.formGroup.controls[control].errors && this.formGroup.controls[control].errors['required']) {
        let fieldName = "";
        switch (control) {
          case 'password':
            fieldName = "senha";
            break;
          case 'login':
            fieldName = "login";
            break;
          case  'cpf':
            fieldName = "CPF"
            break;
          case 'confirmPassword':
            fieldName = "confirmar senha"
            break;
          case "institute":
            fieldName = "instituição"
            break;
        }
        await this.alertService.toastError(`Atenção! O campo ${fieldName} não foi preenchido!`);
        break;
      }
      if (this.formGroup.controls[control].errors && this.formGroup.controls[control].errors['email']) {
        await this.alertService.toastError(`Atenção! Email inválido informado!`);
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

  checkPassStrength() {
   const password = this.formGroup.get('password')?.value;
   this.controlPassword = password;
   this.showStrength = !!password;
  }

  onInstituteUpdate ($event: any) {
  }

  onSelectSearch($event: any) {
    const search = $event.search;
    this.institutes = [];
    if (search) {
      this.instituteService.searchByText(search).subscribe({
        next: async (response: any) => {
          this.institutes = response;
        },
        error: () => {
        },
      });
    }
  }

  checkUsername ($event: any) {
    const username: string = $event.target.value;
    this.userService.checkUsername(username).subscribe({
      next: async (result: any) => {
        if (result.available) {
          this.usernameError = false;
        } else {
          this.usernameError = true;
        }
      }
    });
  }
}
