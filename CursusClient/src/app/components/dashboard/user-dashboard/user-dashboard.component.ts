import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  imports: [RouterModule],
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
}
