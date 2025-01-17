import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CardComponent } from '../../../card/card.component';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule , CardComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent implements OnInit {
  fullname: string = '';
  userId!: null | string;

  ngOnInit(): void {
    // Retrieve data from localStorage
    const storedFullname = localStorage.getItem('fullname');
    const storedUserID = localStorage.getItem('userId');
    // Assign retrieved values or fallback
    this.fullname = storedFullname ? storedFullname : 'Guest User';
    this.userId = storedUserID ? storedUserID : null;
    
  }
  cards = [
    {
      imageUrl: 'application.png',
      title: 'Your Applications',
      description: 'Track the status of your applications to master\'s programs.',
      link1: [
        { name: 'View Applications', routerLink: `/candidatures/user/${localStorage.getItem('userId')}` }
      ]
    },
    {
      imageUrl: 'faculties.png',
      title: 'Available Faculties',
      description: 'Browse and explore the available faculties.',
      link1: [
        { name: 'View Faculties', routerLink: '/facultes' }
      ]
    },
    {
      imageUrl: 'masters.png',
      title: 'Masters Programs',
      description: 'Manage users, including user roles, and permissions',
      link1: [
        { name: 'Explore Masters', routerLink: '/masters' }
      ]
    },
    {
      imageUrl: 'cursus.png',
      title: 'Manage Your Cursus',
      description: 'Add, edit, or delete your academic records.',
      link1: [
        { name: 'Manage Cursus', routerLink: '/mes-cursus' }
      ]
    }
  ];
}
