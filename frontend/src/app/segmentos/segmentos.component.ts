import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SegmentService } from '../../services/segment.service';
import { EliminarComponent } from '../eliminar/eliminar.component';

interface Segmento {
    centro_coste: string;
    fecha: string;
    editado: string;
    color_id: string; 
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
    paginatedSegmentos: Segmento[] = [];
    currentPage = 1;
    itemsPerPage = 7;
    selectedFile: File | null = null; 
    mostrarFormulario: boolean = false;

    constructor(private segmentService: SegmentService) {
        this.updatePaginatedSegmentos();
    }

    get totalPages() {
        return Math.ceil(this.segmentos.length / this.itemsPerPage);
    }

    updatePaginatedSegmentos() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedSegmentos = this.segmentos.slice(start, end);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePaginatedSegmentos();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedSegmentos();
        }
    }

    pages() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    goToPage(page: number) {
        this.currentPage = page;
        this.updatePaginatedSegmentos();
    }

    eliminar() {
        this.mostrarFormulario = true;
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    async cargarSegmentos() {
        if (this.selectedFile) {
            try {
                await this.segmentService.uploadMissiveSegment(this.selectedFile);
                console.log('Segmentos cargados exitosamente');

            } catch (error) {
                console.error('Error al cargar segmentos:', error);
            }
        } else {
            console.error('No se ha seleccionado ningún archivo.');
        }
    }
}
