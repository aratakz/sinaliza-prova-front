import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from '../../shared/guards/auth.guard';
import {RoomComponent} from './room.component';
import {ListComponent} from './components/list/list.component';
import {FormComponent} from './components/form/form.component';

const routes: Routes = [
  {
    path: '',
    canActivateChild: [authGuard],
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
      },
      {
        path: 'form',
        component: FormComponent,
      },
      {
        path: 'form/:id',
        component: FormComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomRoutingModule { }
