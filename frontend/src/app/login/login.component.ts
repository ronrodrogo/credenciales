import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Para usar ngModel
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Importa FormsModule para ngModel
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = {
    email: '',
    password: ''
  };
  mensajeError = '';

  constructor(private router: Router) {}

  gotoHome() {
    if (this.usuario.email === "usuario@ejemplo.com" && this.usuario.password === "c") {
      console.log('Inicio de sesión exitoso');
      this.router.navigate(['/home']); // Redirige al home
    } else {
      this.mensajeError = 'Correo electrónico o contraseña incorrectos';
    }
  }
}
