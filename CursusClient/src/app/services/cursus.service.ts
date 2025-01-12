import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cursus } from '../entities/cursus';
@Injectable({
  providedIn: 'root',
})
export class CursusService {
  private apiUrl = `${environment.apiUrl}/cursus`; // Backend API URL

  // Get roles from localStorage
  private roles: any[] = JSON.parse(localStorage.getItem('roles') || '[]');
  private rolesString = this.roles.map((role) => role.name).join(','); // Join the role names into a string

  // Set HTTP headers with roles included
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Roles': this.rolesString, // prettier-ignore
    }),
  };

  constructor(private http: HttpClient) {}

  // Create a new Cursus
  createCursus(userId: number, cursus: Cursus): Observable<Cursus> {
    return this.http.post<Cursus>(
      `${this.apiUrl}?userId=${userId}`,
      cursus,
      this.httpOptions
    );
  }

  // Get all Cursuses for a specific User
  getCursusesByUser(userId: number): Observable<Cursus[]> {
    return this.http.get<Cursus[]>(
      `${this.apiUrl}/by-user/${userId}`,
      this.httpOptions
    );
  }

  // Update a Cursus
  updateCursus(cursusId: number, cursus: Cursus): Observable<Cursus> {
    return this.http.put<Cursus>(
      `${this.apiUrl}/${cursusId}`,
      cursus,
      this.httpOptions
    );
  }

  // Delete a Cursus
  deleteCursus(cursusId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${cursusId}`,
      this.httpOptions
    );
  }
}
