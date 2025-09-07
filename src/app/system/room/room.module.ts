import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { ListComponent } from './components/list/list.component';
import {SharedModule} from '../../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    RoomComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RoomModule { }
