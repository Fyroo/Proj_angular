import { Routes } from '@angular/router';
import { ListMasterComponent } from './components/master/list-master/list-master.component';
import { AddMasterComponent } from './components/master/add-master/add-master.component';
import { AddFaculteComponent } from './components/faculte/add-faculte/add-faculte.component';
import { ListFaculteComponent } from './components/faculte/list-faculte/list-faculte.component';
import { UserManagementComponent } from './components/user/user-management/user-management.component';
import { LoginComponent } from './components/security/login/login.component';
import { RegisterComponent } from './components/security/register/register.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ManageFaculteComponent } from './components/faculte/manage-faculte/manage-faculte.component';
import { ManageMasterComponent } from './components/master/manage-master/manage-master.component';
import { ManageCursusComponent } from './components/cursus/manage-cursus/manage-cursus.component';
import { ListCursusComponent } from './components/cursus/list-cursus/list-cursus.component';
import { ListUserCandidatureComponent } from './components/candidature/list-user-candidature/list-user-candidature.component';
import { ListMasterCandidatureComponent } from './components/candidature/list-master-candidature/list-master-candidature.component';
import { ManageCandidatureComponent } from './components/candidature/manage-candidature/manage-candidature.component';
export const routes: Routes = [
  { path: 'admin/facultes', component: ManageFaculteComponent },
  { path: 'admin/add-faculte', component: AddFaculteComponent },
  { path: 'admin/facultes', component: ManageFaculteComponent },
  { path: 'admin/user-management', component: UserManagementComponent },

  { path: 'manager/add-master', component: AddMasterComponent },
  { path: 'manager/manage-master', component: ManageMasterComponent },
  { path: 'manager/manage-master/:id', component: ManageMasterComponent },
  { path: 'manager/list-cursus/:userId', component: ListCursusComponent },
  {
    path: 'manage-candidatures/master/:masterId',
    component: ManageCandidatureComponent,
  },

  { path: 'facultes', component: ListFaculteComponent },
  { path: 'masters', component: ListMasterComponent },
  { path: 'mes-cursus', component: ManageCursusComponent },
  {
    path: 'candidatures/master/:masterId',
    component: ListMasterCandidatureComponent,
  },
  {
    path: 'candidatures/user/:userId',
    component: ListUserCandidatureComponent,
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: '', redirectTo: '/profile', pathMatch: 'full' },
];
