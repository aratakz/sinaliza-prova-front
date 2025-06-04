import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { RenewPasswordComponent } from './components/renew-password/renew-password.component';
import { SendEmailComponent } from './components/send-email/send-email.component';
import { AuthComponent } from './auth.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './services/auth.service';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpHandler, provideHttpClient} from '@angular/common/http';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    RenewPasswordComponent,
    SendEmailComponent,
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    provideHttpClient(),
  ]
})
export class AuthModule { }
