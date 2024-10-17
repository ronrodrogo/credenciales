import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credencial-exitosa',
  standalone: true,
  templateUrl: './credencial-exitosa.component.html',
  styleUrls: ['./credencial-exitosa.component.css'],
  imports: [FormsModule, CommonModule]
})
export class CredencialExitosaComponent implements OnInit {
  nombre: string = '';
  cargo: string = '';
  correo: string = '';
  celular: string = '';
  qrCodeDataUrl: string = '';
  segmento: string = '';
  area: string = '';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarDatosColaborador(id);
    });
  }

  cargarDatosColaborador(id: number) {
    // Verifica primero si los datos están disponibles en localStorage
    const colaboradorData = localStorage.getItem('colaboradorData');
    if (colaboradorData) {
      const colaborador = JSON.parse(colaboradorData);
      
      this.nombre = colaborador.nombre || 'Nombre no disponible';
      this.cargo = colaborador.cargo || 'Cargo no disponible';
      this.correo = colaborador.correo || 'Correo no disponible';
      this.celular = colaborador.celular || 'Celular no disponible';
      this.segmento = colaborador.segmento || 'Segmento no disponible';
      this.area = colaborador.area || 'Área no disponible';
      this.qrCodeDataUrl = colaborador.qrCodeUrl || '';  // Obtén el QR desde el localStorage

      console.log('Datos del colaborador recuperados de localStorage:', colaborador);
    } else {
      console.error('No se encontraron datos del colaborador en localStorage');
    }
  }
}
