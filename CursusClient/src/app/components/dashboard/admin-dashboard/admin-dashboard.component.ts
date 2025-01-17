import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule, CommonModule , CardComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent {
  constructor() {}
  cards = [
    {
      imageUrl: 'https://i.imgur.com/uhzSwuU.jpeg',
      title: 'Masters Management',
      description: 'Manage masters, including adding, updating, and deleting master programs.',
      link1: [
        { name: 'Manage Masters', routerLink: '/manager/manage-master' },
        { name: 'Add Master', routerLink: '/manager/add-master' }
      ]
    },
    {
      imageUrl: 'https://extension.harvard.edu/wp-content/uploads/sites/8/2020/12/aerial-harvard.jpg',
      title: 'Facultes Management',
      description: 'Manage facultes, including adding new facultes and updating or deleting existing ones.',
      link1: [
        { name: 'Manage Facultes', routerLink: '/admin/manage-facultes' },
        { name: 'Add Faculté', routerLink: '/admin/add-faculte' }
      ]
    },
    {
      imageUrl: 'https://i.imgur.com/JGmoHaP.jpeg',
      title: 'User Management',
      description: 'Manage users, including user roles, and permissions',
      link1: [
        { name: 'User Management', routerLink: '/admin/user-management' }
      ]
    }
  ];
}
