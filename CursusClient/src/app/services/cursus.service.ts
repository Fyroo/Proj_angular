import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cursus } from '../entities/cursus';

@Injectable({
  providedIn: 'root',
})
export class CursusService {
  private apiUrl = 'http://localhost:8080/cursus'; // Backend URL

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  // Get all Cursus
  getCursusList(): Observable<Cursus[]> {
    return this.http.get<Cursus[]>(`${this.apiUrl}/list`);
  }

  // Get a single Cursus by ID
  getCursusById(cursusId: number): Observable<Cursus> {
    return this.http.get<Cursus>(`${this.apiUrl}/${cursusId}`);
  }

  // Create a new Cursus
  addCursus(cursus: Cursus): Observable<Cursus> {
    return this.http.post<Cursus>(
      `${this.apiUrl}/add`,
      cursus,
      this.httpOptions
    );
  }

  // Update an existing Cursus
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
