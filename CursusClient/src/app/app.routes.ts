import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AddComponent } from './components/add/add.component';
import { AfficherComponent } from './components/afficher/afficher.component';

export const routes: Routes = [
  { path: "add", component: AddComponent },
  { path: "list", component: AfficherComponent },
];
