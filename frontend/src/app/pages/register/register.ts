import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password_confirmation: ['', Validators.required],
  });

  erreur = '';
  chargement = false;

  onSoumettre(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.chargement = true;
    this.erreur = '';

    const { name, email, password, password_confirmation } = this.registerForm.value;

    this.authService.register(name!, email!, password!, password_confirmation!).subscribe({
      next: () => this.router.navigate(['/catalogue']),
      error: () => {
        this.chargement = false;
        this.erreur = "Erreur lors de l'inscription. Vérifiez vos informations.";
      },
    });
  }
}
