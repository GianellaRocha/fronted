import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // ¡IMPORTANTE para *ngIf si lo usas!
import { AuthService } from 'app/config/services/auth.service'; // <--- Importa tu servicio de autenticación
import { Router } from '@angular/router';     // <--- Importa Router para la navegación

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule], // Añade CommonModule aquí
  templateUrl: './register.html', // Asegúrate de que el nombre del archivo HTML sea correcto
  styleUrl: './register.css'      // Asegúrate de que el nombre del archivo CSS sea correcto
})

export class RegisterComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null; // Para mostrar errores al usuario
  successMessage: string | null = null; // Para mostrar mensajes de éxito

  constructor(
    private authService: AuthService, // Inyecta el servicio
    private router: Router            // Inyecta el router
  ) { }

  onRegister() {
    this.errorMessage = null; // Limpiar mensajes previos
    this.successMessage = null; // Limpiar mensajes previos

    console.log('Attempting to register with', this.email, this.password);

    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.successMessage = response.message || '¡Registro exitoso! Redirigiendo al inicio de sesión...';

        // Opcional: Redirigir al login después de un pequeño retraso para que el usuario vea el mensaje
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000); // Redirige después de 2 segundos
      },
      error: (error) => {
        console.error('Error de registro:', error);
        // Manejo de errores basado en el código de estado HTTP
        if (error.status === 409) { // 409 Conflict: Comúnmente para "usuario ya existe"
          this.errorMessage = 'El correo electrónico ya está registrado. Por favor, inicia sesión o usa otro correo.';
        } else if (error.error && error.error.message) {
          // Si el backend envía un mensaje de error específico
          this.errorMessage = error.error.message;
        } else {
          // Mensaje genérico para otros tipos de errores (red, servidor, etc.)
          this.errorMessage = 'Ocurrió un error inesperado durante el registro. Intenta de nuevo más tarde.';
        }
      }
    });
  }
}