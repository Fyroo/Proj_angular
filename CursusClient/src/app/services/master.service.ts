import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Master } from '../entities/master';
@Injectable({
  providedIn: 'root',
})
export class MasterService {
  private baseUrl = 'http://127.0.0.1:8080/masters'; // Base URL for Master API

  constructor(private http: HttpClient) {}

  // Get all Masters
  getAll(): Observable<Master[]> {
    return this.http.get<Master[]>(this.baseUrl);
  }

  // Get a single Master by ID
  getById(id: number): Observable<Master> {
    return this.http.get<Master>(`${this.baseUrl}/${id}`);
  }

  // Create a new Master
  create(master: Master): Observable<Master> {
    return this.http.post<Master>(this.baseUrl, master);
  }

  // Update an existing Master
  update(id: number, master: Master): Observable<Master> {
    return this.http.put<Master>(`${this.baseUrl}/${id}`, master);
  }

  // Delete a Master by ID
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Get all candidatures for a specific Master
  getCandidatures(masterId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/${masterId}/candidatures`);
  }
}
