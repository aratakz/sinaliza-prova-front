import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import {AuthService} from "../auth/services/auth.service";
import {provideHttpClient} from "@angular/common/http";


@NgModule({
  declarations: [
    SystemComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
  ],
  providers: [
      AuthService,
      provideHttpClient()
  ]
})
export class SystemModule { }
