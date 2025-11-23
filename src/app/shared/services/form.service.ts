import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {AlertService} from './alert.service';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private  authService: AuthService,
    private alertService: AlertService,
    private router: Router
  ) {}


  async submitLoginForm(formValues: any) {
    const login:any = await lastValueFrom(this.authService.login(formValues))
      .catch(async (error: any) =>
        this.alertService.toastError('Login ou senha inválidos.'));
    await this.authService.storeToken(login.token);
    await this.alertService.toastSuccess("Logado com sucesso!");
    await this.router.navigate(['/']);
  }
}
