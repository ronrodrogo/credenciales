import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollaboratorService } from '../../services/collaborators.service';

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

  constructor(
    private route: ActivatedRoute,
    private colaboradoresService: CollaboratorService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.cargarDatosColaborador(id);
    });
  }

  cargarDatosColaborador(id: number) {
    this.colaboradoresService.getCollaboratorById(id)
      .then(response => {
        console.log('Respuesta de la API:', response);
        const colaborador = response.content;
        
        // Asigna los datos a las variables del componente
        this.nombre = colaborador.completeName || 'Nombre no disponible';
        this.cargo = colaborador.position || 'Cargo no disponible';
        this.correo = colaborador.email || 'Correo no disponible';
        this.celular = colaborador.phone || 'Celular no disponible';
        
        // Asigna el código QR desde la API o revisa si no está presente
        this.qrCodeUrl = colaborador.qrCodeUrl || '';
        
        // Si no existe el QR Code en la respuesta de la API, búscalo en el localStorage
        if (!this.qrCodeUrl) {
          const colaboradorData = localStorage.getItem('colaboradorData');
          if (colaboradorData) {
            const storedData = JSON.parse(colaboradorData);
            this.qrCodeUrl = storedData.qrCodeUrl || ''; // Usa el QR almacenado en el localStorage
          }
        }
      })
      .catch(error => {
        console.error('Error al cargar los datos del colaborador:', error);
      });
  }
}
