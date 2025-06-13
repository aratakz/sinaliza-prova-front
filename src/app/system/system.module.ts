import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { HeaderComponent } from './layout/header/header.component';
import {AuthService} from "../auth/services/auth.service";
import {provideHttpClient} from "@angular/common/http";
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { UserComponent } from './components/user/user.component';
import {ImageCropperComponent} from 'ngx-image-cropper';


@NgModule({
  declarations: [
    SystemComponent,
    DashboardComponent,
    NavbarComponent,
    HeaderComponent,
    ActivityListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ImageCropperComponent
  ],
  providers: [
      AuthService,
      provideHttpClient()
  ]
})
export class SystemModule { }
