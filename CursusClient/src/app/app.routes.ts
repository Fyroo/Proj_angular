import { Routes } from '@angular/router';
import { ListMasterComponent } from './components/master/list-master/list-master.component';
import { AddMasterComponent } from './components/master/add-master/add-master.component';
import { AddFaculteComponent } from './components/faculte/add-faculte/add-faculte.component';
import { ListFaculteComponent } from './components/faculte/list-faculte/list-faculte.component';
export const routes: Routes = [
  { path: '', redirectTo: '/masters', pathMatch: 'full' },
  { path: 'masters', component: ListMasterComponent },
  { path: 'add-master', component: AddMasterComponent },
  { path: 'facultes', component: ListFaculteComponent },
  { path: 'add-faculte', component: AddFaculteComponent },
];
