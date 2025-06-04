import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);

  if (!window.localStorage.getItem("token")) {
    await router.navigate(['../auth']);
    return false;
  }
  return true;
};
