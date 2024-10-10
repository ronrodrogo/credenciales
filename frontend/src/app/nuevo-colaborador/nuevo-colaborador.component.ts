import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';

@Component({
  selector: 'app-nuevo-colaborador',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './nuevo-colaborador.component.html',
  styleUrls: ['./nuevo-colaborador.component.css']
})
export class NuevoColaboradorComponent {
  nombre: string = '';
  rut: string = '';
  gerencia: string = '';
  cargo: string = '';
  segmento: string = '';
  celular: string = '';
  correo: string = '';
  sede: string = '';
  foto: File | null = null;

  qrCodeUrl: string = '';

  @Output() cerrar = new EventEmitter<void>();
  @Output() generarCredencial = new EventEmitter<any>();

  constructor() {}

  async guardarDatos() {
    const userData = {
      nombre: this.nombre,
      rut: this.rut,
      gerencia: this.gerencia,
      cargo: this.cargo,
      segmento: this.segmento,
      celular: this.celular,
      correo: this.correo,
      sede: this.sede,
      foto: this.foto
    };
  
    this.generateQRCode(userData); 
    this.generarCredencial.emit(userData);
    this.cerrar.emit(); 
  }

  generateQRCode(data: any) {
    const vCard = `
      BEGIN:VCARD
      VERSION:3.0
      N:${data.nombre}
      FN:${data.nombre}
      EMAIL:${data.correo}
      TEL;TYPE=CELL:${data.celular}
      END:VCARD`;

    QRCode.toDataURL(vCard)
      .then(url => {
        this.qrCodeUrl = url; 
        console.log('QR Code generado:', this.qrCodeUrl);
      })
      .catch(err => {
        console.error('Error generando QR Code:', err);
      });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.foto = input.files[0];
    }
  }
}
