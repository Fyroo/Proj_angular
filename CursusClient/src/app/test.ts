import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'; // For browser-specific features
import { HttpClient, provideHttpClient } from '@angular/common/http'; // To allow HTTP requests
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // To use ngModel
import { AppComponent } from './app.component';
import { AddMasterComponent } from './components/master/add-master/add-master.component';
import { ListMasterComponent } from './components/master/list-master/list-master.component';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [AppComponent, AddMasterComponent, ListMasterComponent],
  imports: [
    BrowserModule, // Main module for Angular apps
    FormsModule, // For using ngModel
    AddMasterComponent,
    ReactiveFormsModule,
    CommonModule,
    RouterOutlet,
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
