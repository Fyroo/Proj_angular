import { Routes } from '@angular/router';
import { ListMasterComponent } from './components/master/list-master/list-master.component';
import { AddMasterComponent } from './components/master/add-master/add-master.component';
import { AddFaculteComponent } from './components/faculte/add-faculte/add-faculte.component';
import { ListFaculteComponent } from './components/faculte/list-faculte/list-faculte.component';
import { AddCandidatureComponent } from './components/candidature/add-candidature/add-candidature.component';
import { ListCandidatureComponent } from './components/candidature/list-candidature/list-candidature.component';
import { UserManagementComponent } from './components/user/user-management/user-management.component';
import { LoginComponent } from './components/security/login/login.component';
export const routes: Routes = [
  { path: 'masters', component: ListMasterComponent },
  { path: 'add-master', component: AddMasterComponent },
  { path: 'facultes', component: ListFaculteComponent },
  { path: 'add-faculte', component: AddFaculteComponent },
  { path: 'add-candidature/:masterId', component: AddCandidatureComponent },
  { path: 'candidatures/:masterId', component: ListCandidatureComponent },
  { path: 'user-management', component: UserManagementComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/user-management', pathMatch: 'full' },
];
