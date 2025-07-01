import { Component } from '@angular/core';
import { AuthService } from '../..//services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

interface RegisterResponse {
  message?: string;
  access_token?: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class RegisterComponent {
  form: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  onRegister() {
    if (this.form.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.value;

    this.authService.register({ email, password }).subscribe({
      next: (response: RegisterResponse) => {
        this.successMessage = response.message || 'Registro exitoso. Redirigiendo...';
        if (response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
        setTimeout(() => {
          this.router.navigate(['/restaurant']);
        }, 1500);
      },
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this.errorMessage = 'El correo ya está registrado.';
        } else if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
        } else {
          this.errorMessage = 'Error inesperado. Intenta más tarde.';
        }
      }
    });
  }
}
