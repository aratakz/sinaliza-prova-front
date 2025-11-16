import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProfilesComponent} from './profiles.component';
import {ListComponent} from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: ListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilesRoutingModule { }
