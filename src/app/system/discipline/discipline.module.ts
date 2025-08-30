import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DisciplineRoutingModule } from './discipline-routing.module';
import { DisciplineComponent } from './discipline.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    DisciplineComponent,
    ListComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    DisciplineRoutingModule
  ]
})
export class DisciplineModule { }
