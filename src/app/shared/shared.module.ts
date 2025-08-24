import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassStrengthComponent } from './components/pass-strength/pass-strength.component';



@NgModule({
  declarations: [

    PassStrengthComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PassStrengthComponent
  ]
})
export class SharedModule { }
