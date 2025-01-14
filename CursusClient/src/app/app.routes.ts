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
  //this route lets admin manages facultes(delete/update)
  { path: 'admin/manage-facultes', component: ManageFaculteComponent },
  //this route lets admin add facultes
  { path: 'admin/add-faculte', component: AddFaculteComponent },
  //this route lets admin manage users(delete/update roles)
  { path: 'admin/user-management', component: UserManagementComponent },
  //////////////////////////////////////////////
  //this route lets managers add masters
  { path: 'manager/add-master', component: AddMasterComponent },
  //this route lets managers manage masters(delete/update)
  { path: 'manager/manage-master', component: ManageMasterComponent },
  //this route lets managers see the cursuses of a candidate(his educational background etc.. to judge accepting his candidature)
  { path: 'manager/list-cursus/:userId', component: ListCursusComponent },
  {
    //this route lets managers see the candidatures made for each master and  changes their etat(approved/declined/etc..)
    path: 'manage-candidatures/master/:masterId',
    component: ManageCandidatureComponent,
  },
  ///////////////////////////////////////////
  //this route lets any user see the list of facultes available
  { path: 'facultes', component: ListFaculteComponent },
  //this route lets any user see the list of masters available and make his candidature
  { path: 'masters', component: ListMasterComponent },
  //this route lets users manage their cursus(add/edit/delete)
  { path: 'mes-cursus', component: ManageCursusComponent },
  //this route lets users see their all candidatures for a specefic master
  {
    path: 'candidatures/master/:masterId',
    component: ListMasterCandidatureComponent,
  },
  //this route lets users see their own candidatures for each master
  {
    path: 'candidatures/user/:userId',
    component: ListUserCandidatureComponent,
  },
  //user profile
  { path: 'profile', component: ProfileComponent },
  //login
  { path: 'login', component: LoginComponent },
  //register
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/profile', pathMatch: 'full' },
];
