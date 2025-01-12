import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    password: '',
    fullname: '',
    email: '',
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit(): void {
    this.userService.register(this.user).subscribe({
      next: (user) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = ''; // Clear any previous error message
        setTimeout(() => {
          this.router.navigate(['/login']); // Redirect to login page after successful registration
        }, 2000);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Registration failed. Please try again.'; // Set an error message
        this.successMessage = '';
      },
    });
  }
}
