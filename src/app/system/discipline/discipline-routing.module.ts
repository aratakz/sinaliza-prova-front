import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DisciplineComponent} from './discipline.component';
import {ListComponent} from './components/list/list.component';
import {FormComponent} from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    component: DisciplineComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'form',
        component: FormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
