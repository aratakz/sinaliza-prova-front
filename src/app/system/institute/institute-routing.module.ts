import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InstituteComponent} from './institute.component';
import {ListComponent} from './components/list/list.component';
import {FormComponent} from './components/form/form.component';

const routes: Routes = [{
  path: '',
  component: InstituteComponent,
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
      path: 'register',
      component: FormComponent,
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteRoutingModule { }
