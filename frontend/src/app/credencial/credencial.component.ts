import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credencial',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],  // Asegúrate de importar ReactiveFormsModule aquí
  templateUrl: './credencial.component.html',
  styleUrls: ['./credencial.component.css']  // Corregido: styleUrls en plural
})
export class CredencialComponent {
  
  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formulario = this.fb.group({
      nombreCompleto: [''],
      rut: [''],
      areaTrabajo: [''],
      jefaturaDirecta: [''],
      cargo: [''],
      celular: [''],
      correoElectronico: [''],
      estado: [''],
      foto: [null]
    });
  }

  onSubmit() {
    console.log(this.formulario.value);
  }
}
