import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ListMasterComponent } from './components/master/list-master/list-master.component';
import { AddMasterComponent } from './components/master/add-master/add-master.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { AddFaculteComponent } from './components/faculte/add-faculte/add-faculte.component';
import { ListFaculteComponent } from './components/faculte/list-faculte/list-faculte.component';
import { AddCandidatureComponent } from './components/candidature/add-candidature/add-candidature.component';
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature.component';
import { UserManagementComponent } from './components/user/user-management/user-management.component';
import { LoginComponent } from './components/security/login/login.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    UserManagementComponent,
    ListMasterComponent,
    AddMasterComponent,
    AddFaculteComponent,
    AddCandidatureComponent,
    ListCandidatureComponent,
    ListFaculteComponent,
    FormsModule,
    CommonModule,
    LoginComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'CursusClient';
}
