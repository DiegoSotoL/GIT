import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { StaffFormComponent } from './components/staff-form/staff-form.component';
import { StaffListComponent } from './components/staff-list/staff-list.component';

import { StaffService} from './services/staff.service';
import{FormsModule}from  '@angular/forms';
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StaffFormComponent,
    StaffListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule    
  ],
  providers: [
    StaffService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
