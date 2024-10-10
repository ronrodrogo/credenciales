import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import QRCode from 'qrcode';

@Component({
  selector: 'app-generar-credencial',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './generar-credencial.component.html',
  styleUrls: ['./generar-credencial.component.css']
})
export class GenerarCredencialComponent {
  nombre: string = '';
  rut: string = '';
  gerencia: string = '';
  cargo: string = '';
  segmento: string = '';
  celular: string = '';
  correo: string = '';
  sede: string = '';
  adjuntaFirma: boolean = false;
  adjuntaCredencial: boolean = false;
  foto: File | null = null;
  qrCodeUrl: string | undefined;

  @Output() cerrar = new EventEmitter<void>();

  guardarDatos() {
    const userData = {
      nombre: this.nombre,
      rut: this.rut,
      gerencia: this.gerencia,
      cargo: this.cargo,
      segmento: this.segmento,
      celular: this.celular,
      correo: this.correo,
      sede: this.sede,
      adjuntaFirma: this.adjuntaFirma,
      adjuntaCredencial: this.adjuntaCredencial,
      foto: this.foto
    };

    console.log(userData);
    this.generateQRCode(); 
    this.cerrar.emit();
  }

  async generateQRCode() {
    const contactInfo = `BEGIN:VCARD\nFN:${this.nombre}\nTEL:${this.celular}\nEMAIL:${this.correo}\nEND:VCARD`;
    try {
      this.qrCodeUrl = await QRCode.toDataURL(contactInfo);
      console.log('QR Code generado:', this.qrCodeUrl);
    } catch (err) {
      console.error('Error generando QR Code:', err);
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.foto = input.files[0];
    }
  }
}
