import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

   onSubmit() {
    // Limpiar error previo
    this.error = '';

    // Validar campos básicos
    if (!this.email || !this.password) {
      this.error = 'Por favor ingrese email y contraseña.';
      return;
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.error = 'Ingrese un correo electrónico válido.';
      return;
    }

    // Intentar iniciar sesión
    this.authService.login(this.email, this.password).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Email o contraseña incorrectos';
        }
      },
      error: (err) => {
        this.error = 'Error de conexión. Inténtelo de nuevo.';
        console.error('Error login:', err);
      }
    });
  }
}