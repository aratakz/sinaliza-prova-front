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
  strength: string = '';
  passStatus:string =  'strong';
  showStrength:string = '';
  institutes: Array<any> = [
  ];
  selectedInstitute: any;

  constructor(
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private instituteService: InstituteService,
  ) {
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      institute: ['', [Validators.required]],
    })
  }
  ngOnInit() {
    this.instituteService.getAll().subscribe({
      next: (response: any) => {
        for (const institute of response) {
          this.institutes.push({value: institute.id, label: institute.name.toUpperCase()});
        }
      }
    })
  }

  async onSubmit() {

    if (!this.formGroup.valid) {
      this.formGroup.enable();
      await this.displayErrors();
    } else {
      this.userService.registerStudent(this.formGroup.value).subscribe({
        next: async () => {
          await this.router.navigate(['/auth/send-email'], {
            queryParams: {
              message:"Enviamos um e-mail  com as instruções de ativação para",
              email: this.formGroup.value.email,
            }
          })
        },
        error: () => this.formGroup.enable()
      });
      this.formGroup.disable();
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
          case 'username':
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
      if (this.formGroup.controls['username'].errors && this.formGroup.controls['username'].errors['minlength']) {
        await this.alertService.toastError(`O login pelo menos 6 caracteres.`);
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

  }

  onInstituteUpdate ($event: any) {

  }
}
