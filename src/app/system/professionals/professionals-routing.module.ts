import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfessionalsComponent} from './professionals.component';
import {ListComponent} from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ProfessionalsComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: ListComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfessionalsRoutingModule { }
