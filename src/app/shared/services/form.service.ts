import { Injectable } from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {AlertService} from './alert.service';
import {Router} from '@angular/router';
import {lastValueFrom} from 'rxjs';
import {InstituteService} from './institute.service';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(
    private  authService: AuthService,
    private alertService: AlertService,
    private instituteService: InstituteService,
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
  async submitInstituteForm(data: any, id: any = null, update: boolean = false) {
    let result;
    if (update) {
      result = lastValueFrom(this.instituteService.update(data, id))
        .catch(async () =>
          await this.alertService.toastError('Não foi possível atualizar o registro.'));
    } else {
      result = lastValueFrom(this.instituteService.register(data))
        .catch(async () =>
          await this.alertService.toastError('Não foi possível registrar'));

    }

    return result;
  }
}
