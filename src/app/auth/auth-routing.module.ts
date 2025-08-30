import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {VerifyEmailComponent} from './components/verify-email/verify-email.component';
import {SendEmailComponent} from './components/send-email/send-email.component';
import {ActivateComponent} from './components/activate/activate.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full"
      },
      {
        path: "login",
        component: LoginComponent
      },
      {
        path: "register",
        component: RegisterComponent
      },
      {
        path: "forgot",
        component: VerifyEmailComponent
      },
      {
        path: "send-email",
        component: SendEmailComponent
      },
      {
        path: "activate/:token",
        component: ActivateComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
