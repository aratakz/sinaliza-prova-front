import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from '../../shared/guards/auth.guard';
import {RoomComponent} from './room.component';
import {ListComponent} from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: RoomComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
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
export class RoomRoutingModule { }
