import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {AlertService} from './shared/services/alert.service';
import {provideHttpClient} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';
import {NgxEditorModule} from 'ngx-editor';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxEditorModule
  ],
  providers: [
    AlertService,
    BsModalService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
