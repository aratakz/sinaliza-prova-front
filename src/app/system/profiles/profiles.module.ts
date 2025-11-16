import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfilesRoutingModule } from './profiles-routing.module';
import { ProfilesComponent } from './profiles.component';
import { ListComponent } from './components/list/list.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    ProfilesComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ProfilesRoutingModule,
    SharedModule
  ]
})
export class ProfilesModule { }
