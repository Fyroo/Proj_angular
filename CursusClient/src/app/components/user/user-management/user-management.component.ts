import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  user: User = { username: '', password: '', fullname: '', email: '' };
  users: User[] = [];
  usernameToDelete: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    // Load all users from the backend
    this.userService.getUser(this.user.username).subscribe((user) => {
      this.users.push(user);
    });
  }

  // Register a new user
  registerUser(): void {
    this.userService.register(this.user).subscribe({
      next: (user) => {
        alert('User registered successfully!');
        this.loadUsers(); // Reload the list of users
      },
      error: (err) => alert('Error registering user: ' + err.message),
    });
  }

  // Delete a user by username
  deleteUser(): void {
    this.userService.deleteUser(this.usernameToDelete).subscribe({
      next: () => {
        alert('User deleted successfully!');
        this.loadUsers(); // Reload the list of users after deletion
      },
      error: (err) => alert('Error deleting user: ' + err.message),
    });
  }
}
