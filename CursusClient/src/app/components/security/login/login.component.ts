import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Handle successful login
        console.log('Login successful:', response);
        this.router.navigate(['/dashboard']); // Navigate to the dashboard or home
      },
      error: (error) => {
        // Handle login error
        console.error('Login error:', error);
        alert('Login failed. Please check your credentials.');
      },
    });
  }
}
