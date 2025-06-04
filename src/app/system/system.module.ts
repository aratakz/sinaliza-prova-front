import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './layout/navbar/navbar.component';


@NgModule({
  declarations: [
    SystemComponent,
    DashboardComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
  ]
})
export class SystemModule { }
