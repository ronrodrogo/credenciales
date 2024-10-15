import { Component, OnInit } from '@angular/core';
import { CollaboratorService } from '../../services/collaborators.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-firma-exitosa',
  standalone: true,
  templateUrl: './firma-exitosa.component.html',
  styleUrls: ['./firma-exitosa.component.css'],
  imports: [FormsModule, CommonModule]
})
export class FirmaExitosaComponent implements OnInit {
  nombre: string = '';
  cargo: string = '';
  correo: string = '';
  celular: string = '';
  qrCodeUrl: string = '';

  constructor(private colaboradoresService: CollaboratorService) {}

  ngOnInit() {
    this.inicializarDatos();
  }

  inicializarDatos() {
    if (typeof window !== 'undefined' && localStorage) {
      const colaborador = localStorage.getItem('colaboradorData');
      if (colaborador) {
        const data = JSON.parse(colaborador);
        this.nombre = data.nombre;
        this.cargo = data.cargo;
        this.correo = data.correo;
        this.celular = data.celular;
        this.qrCodeUrl = data.qrCodeUrl;
      } else {
        console.error('No se encontraron datos de colaborador en localStorage');
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }
}
