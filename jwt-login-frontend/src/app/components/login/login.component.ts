import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const credentials = this.loginForm.value;
    console.log('Datos enviados al backend:', credentials);

    this.authService.login(credentials).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        alert('Inicio de sesión exitoso.');
        localStorage.setItem('token', res.token); 
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Error en el inicio de sesión:', err);
        alert('Error en el inicio de sesión. Verifica tus credenciales.');
      },
    });
  }
}
