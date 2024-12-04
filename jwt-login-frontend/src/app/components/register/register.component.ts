import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert('Por favor, completa todos los campos correctamente.');
      return;
    }

    const userData = this.registerForm.value; 
    console.log('Datos enviados al backend:', userData);

    this.authService.register(userData).subscribe({
      next: (res) => {
        console.log('Respuesta del backend:', res);
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error en el registro:', err);
        alert('Error en el registro. Por favor intenta nuevamente.');
      },
    });
  }
}
