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
  roles: { id: number; name: string }[] = []; // List of available roles
  selectedRoles: number[] = []; // Selected role IDs for a user
  selectedUser: string = ''; // Username for role assignment

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  // Load all users from the backend
  loadUsers(): void {
    this.userService.getAllUsers().subscribe(
      (users) => {
        this.users = users;
      },
      (err) => {
        console.error('Error loading users:', err);
        alert('Error loading users');
      }
    );
  }

  // Load roles from backend (dummy implementation; replace with real API call)
  loadRoles(): void {
    // Replace with actual API to fetch roles
    this.roles = [
      { id: 1, name: 'ROLE_ADMIN' },
      { id: 2, name: 'ROLE_MANAGER' },
      { id: 3, name: 'ROLE_USER' },
    ];
  }

  // Register a new user
  registerUser(): void {
    this.userService.register(this.user).subscribe({
      next: (user) => {
        alert('User registered successfully!');
        this.loadUsers();
      },
      error: (err) => alert('Error registering user: ' + err.message),
    });
  }

  // Delete a user by username
  deleteUser(): void {
    if (!this.usernameToDelete) {
      alert('Please enter a username to delete.');
      return;
    }
    this.userService.deleteUser(this.usernameToDelete).subscribe({
      next: (response) => {
        console.log('Response from server:', response); // Log response for debugging
        alert('User deleted successfully!');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error deleting user:', err);
        alert('Error deleting user: ' + (err.message || err));
      },
      complete: () => {
        console.log('Delete operation completed.');
      },
    });
  }

  // Assign roles to a user
  assignRoles(): void {
    if (!this.selectedUser || this.selectedRoles.length === 0) {
      alert('Please select a user and at least one role.');
      return;
    }

    this.userService
      .assignRoles(this.selectedUser, this.selectedRoles)
      .subscribe({
        next: (user) => {
          alert(`Roles assigned to ${this.selectedUser} successfully!`);
          this.loadUsers();
          this.selectedRoles = [];
          this.selectedUser = '';
        },
        error: (err) => alert('Error assigning roles: ' + err.message),
      });
  }
}
