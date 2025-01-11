import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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

  // Register a new user
  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  // Get user details by username
  getUser(username: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${username}`);
  }

  // Update user information
  updateUser(username: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${username}`, user);
  }

  // Assign roles to a user
  assignRoles(username: string, roleIds: number[]): Observable<User> {
    return this.http.put<User>(
      `${this.apiUrl}/${username}/assignRoles`,
      roleIds
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
    return this.http.delete<void>(`${this.apiUrl}/${username}`);
  }
}
