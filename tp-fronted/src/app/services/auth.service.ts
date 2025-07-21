// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators'; // Operadores de RxJS están en 'rxjs/operators'
import { Observable, BehaviorSubject } from 'rxjs'; // <-- ¡Añade BehaviorSubject aquí!
import { Router } from '@angular/router'; // <-- ¡Añade Router aquí!

import { axiosAuthService } from './axiosClient';
import { config } from 'app/config/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private router: Router) { }

  private hasToken(): boolean {
    return !!localStorage.getItem('access_token');
  }

  getIsLoggedInObservable(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  checkTokenValidity(): boolean {
    return !!this.getToken();
  }

  async login(credentials: { email: string; password: string }): Promise<any> {
    const respuesta = (await axiosAuthService.post(config.urls.login, credentials)).data;
    const token = respuesta.access_token;
    const refreshToken = respuesta.refresh_token;
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      this.loggedIn.next(true);
    }
    return respuesta;
  }

  async register(credentials: { email: string; password: string }): Promise<any> {
    const respuesta = (await axiosAuthService.post(config.urls.register, credentials)).data;
    const token = respuesta.access_token;
    const refreshToken = respuesta.refresh_token;
    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      this.loggedIn.next(true);
    }
    return respuesta;
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
}