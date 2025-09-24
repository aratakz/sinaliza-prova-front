import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExamRoutingModule } from './exam-routing.module';
import { ExamComponent } from './exam.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import {SharedModule} from '../../shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Select2} from 'ng-select2-component';


@NgModule({
  declarations: [
    ExamComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ExamRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    Select2
  ]
})
export class ExamModule { }
