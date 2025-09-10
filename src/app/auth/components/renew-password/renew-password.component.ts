import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertService} from '../../../shared/services/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-renew-password',
  standalone: false,
  templateUrl: './renew-password.component.html',
  styleUrl: './renew-password.component.scss'
})
export class RenewPasswordComponent implements OnInit {

  // @ts-ignore
  form: FormGroup;
  showStrength = false
  controlPassword: string = '';
  token : string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
    this.token = this.activatedRoute.snapshot.params['token'];
  }
  checkPassStrength() {
    const password = this.form.get('password')?.value;
    this.controlPassword = password;
    this.showStrength = !!password;
  }
  async onSubmit() {
    if (!this.form.valid) {
      await this.alertService.toastError('Forneça as credenciais');
    } else {
      let isWeakLength = this.form.controls['password'].value.length <= 8;
      let isWeakLower = !this.form.controls['password'].value.match(/[a-z]+/);
      let isWeakUpper = !this.form.controls['password'].value.match(/[A-Z]+/);
      let isWeakNumbers = !this.form.controls['password'].value.match(/[0-9]+/);
      let isWeakSpecialChars = !this.form.controls['password'].value.match(/[$@#&!]+/);

      if (isWeakLength || isWeakLower || isWeakUpper || isWeakNumbers || isWeakSpecialChars) {
        await this.alertService.toastError(`Senha fora dos padrões.`);
      } else {
        if (this.form.controls['password'].value != this.form.controls['confirmPassword'].value) {
          await this.alertService.toastError('As senhas não coincidem');
        }

        this.authService.updatePass(this.token, this.form.value).subscribe({
          next: async () => {
            await this.alertService.toastSuccess('Senha atualizada com êxito');
            await this.router.navigate(['/']);
          },
          error: (error) => {
            this.alertService.toastError('Não foi possível atuzalizar as crecenciais');
          }
        });
      }
    }
  }

}
