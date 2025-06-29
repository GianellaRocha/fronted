// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators'; // Operadores de RxJS están en 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'; // <-- ¡Añade BehaviorSubject aquí!
import { Router } from '@angular/router'; // <-- ¡Añade Router aquí!

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = 'http://localhost:3000';

  // Asegúrate de que esta sea la propiedad que declaraste como BehaviorSubject
  // Inicializamos el BehaviorSubject con el estado actual del token
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  // Este método devuelve el Observable para que los componentes puedan suscribirse
  // Es mejor mantener el isLoggedin como un Observable para reactividad
  getIsLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  // Este método comprueba el token directamente para un chequeo síncrono rápido (ej. en guards)
  checkTokenValidity(): boolean {
    return !!this.getToken();
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.loginURL}/login`, credentials).pipe(
      tap((response: any) => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem('access_token', token);
          this.loggedIn.next(true); // Actualiza el BehaviorSubject
        }
      })
    );
  }

  register(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.loginURL}/register`, credentials).pipe(
      tap((response: any) => {
        const token = response.access_token;
        if (token) {
          localStorage.setItem('access_token', token);
          this.loggedIn.next(true); // Actualiza el BehaviorSubject
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.loggedIn.next(false); // Actualiza el BehaviorSubject a false
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  //para autenticar si el usuario tine un token

  
isAuthenticated(): boolean {
  return !!localStorage.getItem('access_token');
}

  // Este método isLoggedIn() está duplicado y generaba el error.
  // Lo he renombrado arriba a getIsLoggedInObservable() para el BehaviorSubject
  // y checkTokenValidity() para la comprobación síncrona.
  // El original que tenías aquí era redundante y causaba el error de TS.
  // Lo he eliminado para evitar la duplicación.
}