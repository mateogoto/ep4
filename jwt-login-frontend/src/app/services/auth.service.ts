import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: { name: string; email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, credentials, { headers });
  }
}
