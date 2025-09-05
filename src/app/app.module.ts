import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import {AlertService} from './shared/services/alert.service';
import {provideHttpClient} from '@angular/common/http';
import {BsModalService} from 'ngx-bootstrap/modal';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    AlertService,
    BsModalService,
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
