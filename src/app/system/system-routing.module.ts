import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SystemComponent} from './system.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {authGuard} from '../shared/guards/auth.guard';
import {UserComponent} from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        canActivate: [authGuard],
        component: DashboardComponent,
      },
      {
        path: 'user-details',
        canActivate: [authGuard],
        component: UserComponent
      },
      {
        path: 'institute',
        canActivate: [authGuard],
        loadChildren: () => import('./institute/institute.module').then(m => m.InstituteModule),
      },
      {
        path: 'question',
        canActivate: [authGuard],
        loadChildren: () => import('./question/question.module').then(m => m.QuestionModule),
      },
      {
        path: 'discipline',
        canActivate: [authGuard],
        loadChildren: () => import('./discipline/discipline.module').then(m => m.DisciplineModule),
      },
      {
        path: 'students',
        canActivate: [authGuard],
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
      },
      {
        path: 'room',
        canActivate: [authGuard],
        loadChildren: () => import('./room/room.module').then(m => m.RoomModule),
      },
      {
        path: "exam",
        canActivate: [authGuard],
        loadChildren: () => import('./exam/exam.module').then((m) => m.ExamModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule { }
