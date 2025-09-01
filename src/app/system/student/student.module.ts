import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { ListComponent } from './components/list/list.component';
import {SharedModule} from '../../shared/shared.module';
import { FormComponent } from './components/form/form.component';
import {Select2} from 'ng-select2-component';
import {ReactiveFormsModule} from '@angular/forms';
import {NgxMaskDirective, provideNgxMask} from 'ngx-mask';

@NgModule({
  declarations: [
    StudentComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    Select2,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask({}),
  ]
})
export class StudentModule { }
