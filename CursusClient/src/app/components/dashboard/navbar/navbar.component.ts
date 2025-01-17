import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterModule],
})
export class NavbarComponent implements OnInit {
  username: string = ''; // To display the logged-in username
  fullname: string = ''; // To display the logged-in user's full name
  roles: string[] = []; // Array to hold the roles of the user

  constructor(private authService: AuthService, private router: Router) {}
  isMenuActive = false;

  toggleMenu() {
    this.isMenuActive = !this.isMenuActive;
  }
  ngOnInit(): void {
    // Retrieve user data from local storage
    this.username = localStorage.getItem('username') || ''; // Get the username from local storage
    this.fullname = localStorage.getItem('fullname') || ''; // Get the fullname from local storage
    const roles = localStorage.getItem('roles');
    this.roles = roles
      ? JSON.parse(roles).map((role: { name: any }) => role.name)
      : []; // Get roles as an array
      console.log(this.roles);
  }
  
  // Logout function
  logout(): void {
    this.authService.logout(); // Logout logic from AuthService
    localStorage.removeItem('username'); // Remove username from local storage
    localStorage.removeItem('fullname'); // Remove fullname from local storage
    localStorage.removeItem('roles'); // Remove roles from local storage
    this.router.navigate(['/login']); // Redirect to login page after logout
  }

  // Role-based redirection when clicking "Accueil"
  redirectBasedOnRole(): void {
    if (this.roles.length > 0) {
      const role = this.roles[0]; // Assuming a user has at least one role, use the first one
      if (role === 'ROLE_ADMIN') {
        this.router.navigate(['/admin/dashboard']); // Redirect to admin dashboard
      } else if (role === 'ROLE_MANAGER') {
        this.router.navigate(['/manager/dashboard']); // Redirect to manager dashboard
      } else if (role === 'ROLE_USER') {
        this.router.navigate(['/dashboard']); // Redirect to user dashboard
      }
    } else {
      this.router.navigate(['/login']); // If no roles, redirect to login
    }
  }
}
