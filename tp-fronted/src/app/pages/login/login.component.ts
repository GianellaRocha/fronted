// src/app/pages/login/login.component.ts

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenTimeoutService } from 'app/services/tokenTimeout.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private tokenTimeoutService: TokenTimeoutService) { }

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).then(() => {
      this.tokenTimeoutService.startCountdown();
      this.router.navigate(['/restaurant']);
    }).catch(error => {
      alert('Login fallido. Verifica tus credenciales.');
    }
    )
  };
}

