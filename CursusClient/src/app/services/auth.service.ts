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
    console.log('Login Payload:', loginPayload);
    return this.http.post<any>(`${this.apiUrl}/login`, loginPayload).pipe(
      tap((response) => {
        // Assume response contains user info
        this.userService.setLoggedInUserId(response.userId);
      })
    );
  }

  logout(): void {
    this.userService.clearLoggedInUserId();
    // Additionally, you can remove the JWT token if you store it
    localStorage.removeItem('authToken');
  }
}
