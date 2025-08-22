import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteRoutingModule } from './institute-routing.module';
import { InstituteComponent } from './institute.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    InstituteComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    InstituteRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InstituteModule { }
