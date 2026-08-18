import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  erreur = '';
  chargement = false;

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSoumettre(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.chargement = true;
    this.erreur = '';

    const { email, password } = this.loginForm.value;

    this.authService.login(email!, password!).subscribe({
      next: (reponse) => {
        if (reponse.user.role === 'gestionnaire') {
          this.router.navigate(['/gestion-services']);
        } else {
          this.router.navigate(['/catalogue']);
        }
      },
      error: (err) => {
        this.chargement = false;
        this.erreur =
          err.status === 401
            ? 'Email ou mot de passe incorrect'
            : 'Erreur de connexion. Réessayez.';
      },
    });
  }
}
