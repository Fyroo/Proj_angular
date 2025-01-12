import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Role } from '../entities/role';
export interface User {
  id?: number;
  username: string;
  password: string;
  fullname: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/users`;
  private loggedInUserId: number | null = null;
  constructor(private http: HttpClient) {}

  private getHttpOptions() {
    const roles: Role[] = JSON.parse(localStorage.getItem('roles') || '[]'); // Explicitly typing roles as Role[]
    const rolesString = roles.map((role) => role.name).join(','); // Join the role names into a string

    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Roles': rolesString, // prettier-ignore
      }),
    };
  }

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(
      `${this.apiUrl}/register`,
      user,
      this.getHttpOptions()
    );
  }

  // Get user details by username
  getUser(username: string): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/${username}`,
      this.getHttpOptions()
    );
  }
  // Get user details by ID
  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(
      `${this.apiUrl}/id/${userId}`,
      this.getHttpOptions()
    );
  }
  // Update user information
  updateUser(username: string, user: User): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${username}`,
      user,
      this.getHttpOptions()
    );
  }

  // Assign roles to a user
  assignRoles(username: string, roleIds: number[]): Observable<User> {
    console.log('Assigning roles to user:', username);
    console.log('Roles:', roleIds);

    return this.http.put<User>(
      `${this.apiUrl}/${username}/assignRoles`,
      roleIds,
      this.getHttpOptions()
    );
  }

  setLoggedInUserId(userId: number): void {
    this.loggedInUserId = userId;
  }

  getLoggedInUserId(): number | null {
    return this.loggedInUserId;
  }

  clearLoggedInUserId(): void {
    this.loggedInUserId = null;
  }

  // Delete user by username
  deleteUser(username: string): Observable<void> {
    return this.http.delete<any>(
      `${this.apiUrl}/${username}`,
      this.getHttpOptions()
    );
  }

  // Get all users
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/`, this.getHttpOptions());
  }
}
