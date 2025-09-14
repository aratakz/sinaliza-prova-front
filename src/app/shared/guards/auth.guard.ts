import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../auth/services/auth.service';
import {AlertService} from '../services/alert.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService : AuthService = inject(AuthService);
  const alertService : AlertService = inject(AlertService);
  if (!window.localStorage.getItem("token")) {
    await router.navigate(['../auth']);
    return false;
  } else {
    if (window.localStorage.getItem('token')) {
      authService.checkAuthToken(window.localStorage.getItem('token')).subscribe({
        next: () => {
          return true;
        },
        error: async () => {
          await alertService.toastWarning('Sessão encerrada! Relize login novamente.')
          await router.navigate(['../auth']);
          return false;
        }
      });

    }
  }
  return true;
};
