import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Master } from '../entities/master';
import { Role } from '../entities/role';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl = `${environment.apiUrl}/masters`; // Use the API URL from environment

  // Retrieve the token from localStorage or sessionStorage
  roles: Role[] = JSON.parse(localStorage.getItem('roles') || '[]'); // Explicitly typing roles as Role[]
  rolesString = this.roles.map((role) => role.name).join(','); // Join the role names into a string

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Roles': this.rolesString, // prettier-ignore
    }),
  };

  constructor(private http: HttpClient) {}

  // Get all Masters
  getAll(): Observable<Master[]> {
    return this.http.get<Master[]>(this.baseUrl, this.httpOptions);
  }

  // Get a single Master by ID
  getById(id: number): Observable<Master> {
    return this.http.get<Master>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  // Create a new Master
  create(master: Master): Observable<Master> {
    return this.http.post<Master>(this.baseUrl, master, this.httpOptions);
  }

  // Update an existing Master
  update(id: number, master: Master): Observable<Master> {
    return this.http.put<Master>(
      `${this.baseUrl}/${id}`,
      master,
      this.httpOptions
    );
  }

  // Delete a Master by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.httpOptions);
  }

  // Get all candidatures for a specific Master
  getCandidatures(masterId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.baseUrl}/${masterId}/candidatures`,
      this.httpOptions
    );
  }
}
