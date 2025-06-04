import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    loadChildren: () => import('./system/system.module').then((m) => m.SystemModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
