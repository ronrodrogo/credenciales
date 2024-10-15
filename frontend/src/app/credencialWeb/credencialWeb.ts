import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-credencialWeb',
  standalone: true,
  templateUrl: './credencialWeb.html',
  styleUrls: ['./credencialWeb.css'],
})
export class CredencialWebComponent implements OnInit {
  nombre: string = '';
  cargo: string = '';
  correo: string = '';
  celular: string = '';
  sede: string = '';
  qrCodeUrl: string = '';
  segmento: string = '';

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
        this.sede = data.sede;
        this.qrCodeUrl = data.qrCodeUrl;
      } else {
        console.error('No se encontraron datos de colaborador en localStorage');
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }
}
