import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // Import the environment file
import { Master } from '../entities/master';
import { Faculte } from '../entities/faculte'; // Assuming Faculte is in 'entities/faculte.ts'
import { Role } from '../entities/role';

@Injectable({
  providedIn: 'root',
})
export class FaculteService {
  private apiUrl = `${environment.apiUrl}/facultes`; // Use the API URL from the environment

  roles: Role[] = JSON.parse(localStorage.getItem('roles') || '[]'); // Explicitly typing roles as Role[]
  rolesString = this.roles.map((role) => role.name).join(','); // Join the role names into a string

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Roles': this.rolesString, // prettier-ignore
    }),
  };

  constructor(private http: HttpClient) {}

  // Get all faculties
  getFacultes(): Observable<Faculte[]> {
    return this.http.get<Faculte[]>(`${this.apiUrl}/list`, this.httpOptions);
  }

  // Get faculty by ID
  getFaculteById(faculteId: number): Observable<Faculte> {
    return this.http.get<Faculte>(
      `${this.apiUrl}/${faculteId}`,
      this.httpOptions
    );
  }

  // Get all masters for a specific faculty
  getMastersByFaculteId(faculteId: number): Observable<Master[]> {
    return this.http.get<Master[]>(
      `${this.apiUrl}/${faculteId}/masters`,
      this.httpOptions
    );
  }

  // Create a new faculty
  addFaculte(faculte: Faculte): Observable<Faculte> {
    return this.http.post<Faculte>(
      `${this.apiUrl}/add`,
      faculte,
      this.httpOptions
    );
  }

  // Update an existing faculty
  updateFaculte(faculteId: number, faculte: Faculte): Observable<Faculte> {
    return this.http.put<Faculte>(
      `${this.apiUrl}/${faculteId}`,
      faculte,
      this.httpOptions
    );
  }

  // Delete a faculty
  deleteFaculte(faculteId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${faculteId}`,
      this.httpOptions
    );
  }
}
