import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../entities/candidature';
import { Cursus } from '../entities/cursus';
import { UserService } from './user.service'; // Assuming you have a user service for managing logged-in user
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/candidature'; // Adjust the URL to match your backend

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private userService: UserService // Injecting user service to get the logged-in user
  ) {}

  // Get all Candidatures
  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/list`);
  }

  // Add a new Candidature with a specific Master ID and logged-in User ID
  addCandidature(
    masterId: number,
    candidature: Candidature
  ): Observable<Candidature> {
    const userId = this.userService.getLoggedInUserId(); // Get the logged-in user ID
    const candidatureWithUser = { ...candidature, user: { id: userId } }; // Add the user ID to the candidature object

    return this.http.post<Candidature>(
      `${this.apiUrl}/add/${masterId}`,
      candidatureWithUser,
      this.httpOptions
    );
  }

  // Update an existing Candidature
  updateCandidature(
    candidatureId: number,
    candidature: Candidature
  ): Observable<Candidature> {
    return this.http.put<Candidature>(
      `${this.apiUrl}/${candidatureId}`,
      candidature,
      this.httpOptions
    );
  }

  // Delete a Candidature
  deleteCandidature(candidatureId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${candidatureId}`,
      this.httpOptions
    );
  }

  // Get Cursus for a specific Candidature
  getCursusForCandidature(candidatureId: number): Observable<Cursus[]> {
    return this.http.get<Cursus[]>(`${this.apiUrl}/${candidatureId}/cursus`);
  }
}
