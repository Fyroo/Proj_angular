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
import { AdminDashboardComponent } from './components/dashboard/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './components/dashboard/manager-dashboard/manager-dashboard.component';
import { UserDashboardComponent } from './components/dashboard/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
export const routes: Routes = [
  {
    path: 'admin/dashboard',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'manager/dashboard',
    component: ManagerDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_MANAGER' },
  },

  {
    path: 'dashboard',
    component: UserDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'admin/manage-facultes',
    component: ManageFaculteComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'admin/add-faculte',
    component: AddFaculteComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  {
    path: 'admin/user-management',
    component: UserManagementComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_ADMIN' },
  },
  //////////////////////////////////////////////
  {
    path: 'manager/add-master',
    component: AddMasterComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_MANAGER' },
  },
  {
    path: 'manager/manage-master',
    component: ManageMasterComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_MANAGER' },
  },
  {
    path: 'manager/list-cursus/:userId',
    component: ListCursusComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_MANAGER' },
  },
  {
    path: 'manager/manage-candidatures/master/:masterId',
    component: ManageCandidatureComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_MANAGER' },
  },
  ///////////////////////////////////////////
  {
    path: 'facultes',
    component: ListFaculteComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },
  {
    path: 'masters',
    component: ListMasterComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'mes-cursus',
    component: ManageCursusComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'candidatures/master/:masterId',
    component: ListMasterCandidatureComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'candidatures/user/:userId',
    component: ListUserCandidatureComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'ROLE_USER' },
  },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
