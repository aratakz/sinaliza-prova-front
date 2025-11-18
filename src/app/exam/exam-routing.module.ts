import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExamComponent} from './exam.component';

const routes: Routes = [
  {
    path: '',
    component: ExamComponent,
    children: [
      {
        path: '',
        redirectTo: 'exam/{:id}',
        pathMatch: 'full',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
