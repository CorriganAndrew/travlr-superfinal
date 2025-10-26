import { Component } from '@angular/core';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  template: `
    <header
      style="padding:12px;border-bottom:1px solid #ddd;display:flex;align-items:center;gap:16px;"
    >
      <h3 style="margin:0;">Travlr Admin</h3>
      <a routerLink="/">Trips</a>
      <a *ngIf="auth.isLoggedIn()" routerLink="/add">Add Trip</a>

      <span style="flex:1"></span>

      <a *ngIf="!auth.isLoggedIn()" routerLink="/login">Login</a>
      <button
        *ngIf="auth.isLoggedIn()"
        (click)="logout()"
        style="padding:6px 12px;cursor:pointer;"
      >
        Logout
      </button>
    </header>

    <main style="padding:16px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  constructor(public auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
