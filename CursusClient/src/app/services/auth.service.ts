import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private apiUrl = `${environment.apiUrl}`;

  login(username: string, password: string): Observable<any> {
    const loginPayload = { username, password };
    console.log('Login Payload:', loginPayload); // Log the payload being sent
    return this.http.post<any>(`${this.apiUrl}/users/login`, loginPayload).pipe(
      tap({
        next: (response) => {
          console.log('Login response:', response);
          localStorage.setItem('roles', JSON.stringify(response.role));
          localStorage.setItem('username', response.username);
          localStorage.setItem('userId', response.userId); // Store the username
          this.userService.setLoggedInUserId(response.userId);
        },
        error: (err) => {
          console.error('Login request failed:', err);
        },
      })
    );
  }

  logout(): void {
    this.userService.clearLoggedInUserId();
    localStorage.clear();
  }
}
