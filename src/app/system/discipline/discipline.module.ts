import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import {SharedModule} from '../../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DisciplineComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    DisciplineRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class DisciplineModule { }
