import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Candidature } from '../entities/candidature';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  private apiUrl = `${environment.apiUrl}/candidature`; // Backend API URL

  private roles: any[] = JSON.parse(localStorage.getItem('roles') || '[]');
  private rolesString = this.roles.map((role) => role.name).join(','); // Join the role names into a string

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Roles': this.rolesString, // prettier-ignore
    }),
  };

  constructor(private http: HttpClient) {}

  // Create a new Candidature
  createCandidature(userId: number, masterId: number): Observable<Candidature> {
    // Send only userId and masterId to the backend
    return this.http.post<Candidature>(this.apiUrl, null, {
      params: {
        userId: userId.toString(),
        masterId: masterId.toString(),
      },
      ...this.httpOptions,
    });
  }

  // Get candidatures by Master ID
  getCandidaturesByMaster(masterId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(
      `${this.apiUrl}/by-master/${masterId}`,
      this.httpOptions
    );
  }

  // Get candidatures by User ID
  getCandidaturesByUser(userId: number): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(
      `${this.apiUrl}/by-user/${userId}`,
      this.httpOptions
    );
  }

  // Update the "etat" of a Candidature
  updateCandidatureEtat(
    candidatureId: number,
    etat: string
  ): Observable<Candidature> {
    return this.http
      .put<Candidature>(`${this.apiUrl}/${candidatureId}`, null, {
        params: { etat: etat },
        ...this.httpOptions,
      })
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return throwError(error); // Re-throw error to be caught later if needed
        })
      );
  }

  // Delete a Candidature
  deleteCandidature(candidatureId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${candidatureId}`,
      this.httpOptions
    );
  }
}
