import { Component, input, Input } from '@angular/core';
import QRCode from 'qrcode';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-credencial-exitosa',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credencial-exitosa.component.html',
  styleUrls: ['./credencial-exitosa.component.css']
})
export class CredencialExitosaComponent {
  @Input() nombre: string = '';
  @Input() celular: string = '';
  @Input() correo: string = '';
  @Input() cargo: string = '';  
  qrCodeDataUrl: string | undefined;

  ngOnInit() {
    this.generateQRCode();
  }

  async generateQRCode() {
    const contactInfo = `BEGIN:VCARD\nFN:${this.nombre}\nTEL:${this.celular}\nEMAIL:${this.correo}\nEND:VCARD`;
    try {
      this.qrCodeDataUrl = await QRCode.toDataURL(contactInfo);
    } catch (err) {
      console.error(err);
    }
  }
}
