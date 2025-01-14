import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]'); // Fetch roles from local storage
    const requiredRole = route.data['role'] as string; // Get the role defined in the route

    // Check for the presence of the required role or higher (Admin can access all)
    const hasRole = roles.some((role: { name: string }) => {
      return this.isRoleHierarchical(role.name, requiredRole);
    });

    if (hasRole) {
      return true; // Allow access if the required role is found
    }

    // Redirect to login or unauthorized page if the user doesn't have the required role
    this.router.navigate(['/login']);
    return false;
  }

  // Helper function to check for role hierarchy
  private isRoleHierarchical(userRole: string, requiredRole: string): boolean {
    const roleHierarchy = ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN']; // Define the role hierarchy

    const userRoleIndex = roleHierarchy.indexOf(userRole);
    const requiredRoleIndex = roleHierarchy.indexOf(requiredRole);

    return userRoleIndex >= requiredRoleIndex; // User can access if their role is equal to or higher in the hierarchy
  }
}
