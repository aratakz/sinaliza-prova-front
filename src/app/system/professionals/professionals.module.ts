import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfessionalsRoutingModule } from './professionals-routing.module';
import { ProfessionalsComponent } from './professionals.component';
import { ListComponent } from './components/list/list.component';
import {SharedModule} from '../../shared/shared.module';
import { FormComponent } from './components/form/form.component';


@NgModule({
  declarations: [
    ProfessionalsComponent,
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProfessionalsRoutingModule,
    SharedModule
  ]
})
export class ProfessionalsModule { }
