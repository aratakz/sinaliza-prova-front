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
  },
  {
    path: "exam",
    canActivate: [authGuard],
    loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
