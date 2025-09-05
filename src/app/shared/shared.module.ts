import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassStrengthComponent } from './components/pass-strength/pass-strength.component';
import { TableListComponent } from './components/table-list/table-list.component';



@NgModule({
  declarations: [
    PassStrengthComponent,
     TableListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableListComponent,
    PassStrengthComponent
  ]
})
export class SharedModule { }
