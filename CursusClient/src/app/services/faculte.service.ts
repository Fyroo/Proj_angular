import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Master } from '../entities/master';
import { Faculte } from '../entities/faculte'; // Assuming Faculte is in 'entities/faculte.ts'

@Injectable({
  providedIn: 'root',
})
export class FaculteService {
  private apiUrl = 'http://localhost:8080/facultes'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // Get all faculties
  getFacultes(): Observable<Faculte[]> {
    return this.http.get<Faculte[]>(`${this.apiUrl}/list`);
  }

  // Get faculty by ID
  getFaculteById(faculteId: number): Observable<Faculte> {
    return this.http.get<Faculte>(`${this.apiUrl}/${faculteId}`);
  }

  // Get all masters for a specific faculty
  getMastersByFaculteId(faculteId: number): Observable<Master[]> {
    return this.http.get<Master[]>(`${this.apiUrl}/${faculteId}/masters`);
  }

  // Create a new faculty
  addFaculte(faculte: Faculte): Observable<Faculte> {
    return this.http.post<Faculte>(`${this.apiUrl}/add`, faculte);
  }

  // Update an existing faculty
  updateFaculte(faculteId: number, faculte: Faculte): Observable<Faculte> {
    return this.http.put<Faculte>(`${this.apiUrl}/${faculteId}`, faculte);
  }

  // Delete a faculty
  deleteFaculte(faculteId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${faculteId}`);
  }
}
