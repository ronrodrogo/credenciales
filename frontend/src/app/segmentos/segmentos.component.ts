import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentService } from '../../services/segment.service';
import { EliminarComponent } from '../eliminar/eliminar.component';

interface Segmento {
    nombreCompleto: string;
    rut: string;
    gerencia: string;
    sede: string;
    cargo: string;
    celular: string;
    correoElectronico: string;
    segmento: string;
    nombreFoto: string;
    tipoColaborador: string;
}

@Component({
    selector: 'app-segmentos',
    standalone: true,
    imports: [CommonModule, EliminarComponent],
    templateUrl: './segmentos.component.html',
    styleUrls: ['./segmentos.component.css']
})
export class SegmentosComponent {
    segmentos: Segmento[] = [];
    selectedFile: File | null = null; 
    mostrarFormulario: boolean = false;

    constructor(private segmentService: SegmentService) {
        this.updateSegmentos(); // Cargar segmentos al iniciar el componente
    }

    
    updateSegmentos() {
        const params = {
            RequireTotalCount: true,
            Skip: 0,
            Take: 10,
        };
    
        this.segmentService.getAllSegmentPaginated(params).then(data => {
            this.segmentos = data; // Actualiza la lista de segmentos
            console.log('Segmentos obtenidos:', this.segmentos); // Asegúrate de que los datos se estén recibiendo
        }).catch(error => {
            console.error('Error al obtener segmentos:', error);
            alert('Error al obtener segmentos: ' + error.message); // Muestra el mensaje de error
        });
    }
    

    async cargarSegmentos() {
        if (this.selectedFile) {
            try {
                await this.segmentService.uploadMissiveSegment(this.selectedFile);
                console.log('Segmentos cargados exitosamente');
                this.updateSegmentos(); // Actualiza los segmentos después de la carga
            } catch (error) {
                console.error('Error al cargar segmentos:', error);
                alert('Error al cargar segmentos. Intenta nuevamente.');
            }
        } else {
            console.error('No se ha seleccionado ningún archivo.');
            alert('Por favor selecciona un archivo para cargar.');
        }
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }
}
