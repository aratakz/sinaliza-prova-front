import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionComponent } from './question.component';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import {SharedModule} from "../../shared/shared.module";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxEditorMenuComponent} from 'ngx-editor';
import {TextEditorComponent} from './components/text-editor/text-editor.component';


@NgModule({
  declarations: [
    QuestionComponent,
    ListComponent,
    FormComponent
  ],
    imports: [
        CommonModule,
        QuestionRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgxEditorMenuComponent,
        TextEditorComponent,
        FormsModule
    ]
})
export class QuestionModule { }
