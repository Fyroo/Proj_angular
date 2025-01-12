import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidature } from '../entities/candidature';
import { Cursus } from '../entities/cursus';
import { UserService } from './user.service';
import { Role } from '../entities/role';

@Injectable({
  providedIn: 'root',
})
export class CandidatureService {
  private apiUrl = 'http://localhost:8080/candidature';
  roles: Role[] = JSON.parse(localStorage.getItem('roles') || '[]').map(
    (role: { id: number; name: string }) => new Role(role.id, role.name)
  );
  rolesString = this.roles.map((role) => role.name).join(',');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Roles: this.rolesString,
    }),
  };

  constructor(private http: HttpClient, private userService: UserService) {}

  getCandidatures(): Observable<Candidature[]> {
    return this.http.get<Candidature[]>(`${this.apiUrl}/list`);
  }

  addCandidature(
    masterId: number,
    candidature: Candidature
  ): Observable<Candidature> {
    const userId = this.userService.getLoggedInUserId();
    const candidatureWithUser = { ...candidature, user: { id: userId } };

    return this.http.post<Candidature>(
      `${this.apiUrl}/add/${masterId}`,
      candidatureWithUser,
      this.httpOptions
    );
  }

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

  deleteCandidature(candidatureId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${candidatureId}`,
      this.httpOptions
    );
  }

  getCursusForCandidature(candidatureId: number): Observable<Cursus[]> {
    return this.http.get<Cursus[]>(`${this.apiUrl}/${candidatureId}/cursus`);
  }
}
