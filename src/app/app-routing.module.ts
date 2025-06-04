import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from './shared/guards/auth.guard'
const routes: Routes = [
  {
    path: "",
    redirectTo: "system",
    pathMatch:'full'
  },
  {
    path: "auth",
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: "system",
    canActivate: [authGuard],
    loadChildren: () => import('./system/system.module').then((m) => m.SystemModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
