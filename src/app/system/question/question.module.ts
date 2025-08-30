import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    QuestionComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
