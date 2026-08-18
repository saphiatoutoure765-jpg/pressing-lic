import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { LoginReponse, Utilisateur } from '../models/auth-model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user_data';

  private http = inject(HttpClient);
  private router = inject(Router);

  // Signal réactif : la navbar (et tout autre composant) réagira automatiquement à ses changements
  utilisateurActuel = signal<Utilisateur | null>(this.lireUtilisateurDepuisStockage());

  private lireUtilisateurDepuisStockage(): Utilisateur | null {
    const data = localStorage.getItem(this.USER_KEY);
    return data ? JSON.parse(data) : null;
  }

  register(
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
  ): Observable<LoginReponse> {
    return this.http
      .post<LoginReponse>(`${environment.apiUrl}/register`, {
        name,
        email,
        password,
        password_confirmation,
      })
      .pipe(tap((reponse) => this.enregistrerSession(reponse)));
  }

  login(email: string, password: string): Observable<LoginReponse> {
    return this.http
      .post<LoginReponse>(`${environment.apiUrl}/login`, {
        email,
        password,
      })
      .pipe(tap((reponse) => this.enregistrerSession(reponse)));
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/logout`, {}).subscribe();
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.utilisateurActuel.set(null);
    this.router.navigate(['/login']);
  }

  private enregistrerSession(reponse: LoginReponse): void {
    localStorage.setItem(this.TOKEN_KEY, reponse.access_token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(reponse.user));
    this.utilisateurActuel.set(reponse.user);
  }

  estConnecte(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUtilisateur(): Utilisateur | null {
    return this.utilisateurActuel();
  }

  estGestionnaire(): boolean {
    return this.utilisateurActuel()?.role === 'gestionnaire';
  }
}
