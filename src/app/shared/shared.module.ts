import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassStrengthComponent } from './components/pass-strength/pass-strength.component';
import { TableListComponent } from './components/table-list/table-list.component';
import { LibrasActionComponent } from './components/libras-action/libras-action.component';
import { RecordOptionsModalComponent } from './components/modals/record-options-modal/record-options-modal.component';



@NgModule({
  declarations: [
    PassStrengthComponent,
    TableListComponent,
    LibrasActionComponent,
    RecordOptionsModalComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TableListComponent,
    PassStrengthComponent,
    LibrasActionComponent
  ]
})
export class SharedModule { }
