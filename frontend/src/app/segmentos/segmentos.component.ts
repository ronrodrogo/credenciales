import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentService } from '../../services/segment.service';
import { EliminarComponent } from '../eliminar/eliminar.component';

interface Segmento {
    nombreCompleto: string; 
    color: string;         
    id: number;            
    activo: boolean;       
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
        this.updateSegmentos();
    }

    updateSegmentos() {
        const params = {
            RequireTotalCount: true,
            Skip: 0,
            Take: 10,
        };
    
        this.segmentService.getAllSegmentPaginated(params).then((response: any) => {
            if (response && response.content && response.content.data) {
                this.segmentos = response.content.data.map((item: any) => ({
                    nombreCompleto: item.name,
                    color: item.color,
                    id: item.id,
                    activo: item.active
                }));
                console.log('Segmentos obtenidos:', this.segmentos); 
            } else {
                console.error('Se esperaba un objeto con propiedad "content", pero se recibió:', response);
                this.segmentos = []; 
            }
        }).catch(error => {
            console.error('Error al obtener segmentos:', error);
            alert('Error al obtener segmentos: ' + error.message); 
        });
    }
    

    async cargarSegmentos() {
        if (this.selectedFile) {
            try {
                await this.segmentService.uploadMissiveSegment(this.selectedFile);
                console.log('Segmentos cargados exitosamente');
                this.updateSegmentos(); 
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
