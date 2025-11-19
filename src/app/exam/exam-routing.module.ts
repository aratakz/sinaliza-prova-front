import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamComponent} from './exam.component';

const routes: Routes = [
  {
    path: ':id',
    component: ExamComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
