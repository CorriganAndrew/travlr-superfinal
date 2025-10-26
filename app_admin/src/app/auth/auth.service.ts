import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface AuthResponse { token: string; user: { name: string; email: string } }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:3000/api';
  private key = 'travlr_jwt';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, { email, password })
      .pipe(tap(res => localStorage.setItem(this.key, res.token)));
  }

  logout(): void { localStorage.removeItem(this.key); this.router.navigate(['/login']); }

  get token(): string | null { return localStorage.getItem(this.key); }

  isLoggedIn(): boolean {
    const t = this.token; if (!t) return false;
    try { const p = JSON.parse(atob(t.split('.')[1])); return !!p.exp && p.exp > Math.floor(Date.now()/1000); }
    catch { return false; }
  }
}
