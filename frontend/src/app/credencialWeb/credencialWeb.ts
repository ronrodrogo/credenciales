import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import * as QRCode from 'qrcode';

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

  constructor(private sanitizer: DomSanitizer) {}

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
        
        // Generar QR con formato MECARD
        const mecardData = this.generarMecard(data);
        this.generarQRCode(mecardData);
      } else {
        console.error('No se encontraron datos de colaborador en localStorage');
      }
    } else {
      console.error('localStorage no está disponible');
    }
  }

  generarMecard(data: any): string {
    // Construye la cadena MECARD con los datos del colaborador
    return `MECARD:N:${data.nombre};TEL:${data.celular};EMAIL:${data.correo};ADR:${data.sede};;`;
  }

  generarQRCode(mecardData: string) {
    // Generar el QR a partir de la cadena MECARD
    QRCode.toDataURL(mecardData, { errorCorrectionLevel: 'H' }, (err, url) => {
      if (err) {
        console.error(err);
      } else {
        this.qrCodeUrl = this.sanitizer.bypassSecurityTrustUrl(url) as string;
      }
    });
  }
}
