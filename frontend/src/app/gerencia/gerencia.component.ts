import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GerenciaService } from '../../services/gerencia.service';
import { EliminarComponent } from '../eliminar/eliminar.component';

interface Gerencia {
    gerencia: string;
    fecha: string;
    editado: string;
    estado: string;
}

@Component({
    selector: 'app-gerencia',
    standalone: true,
    imports: [CommonModule, EliminarComponent],
    templateUrl: './gerencia.component.html',
    styleUrls: ['./gerencia.component.css']
})
export class GerenciasComponent {
    gerencias: Gerencia[] = []; 
    paginatedGerencias: Gerencia[] = [];
    currentPage = 1;
    itemsPerPage = 7;
    selectedFile: File | null = null; 

    constructor(private gerenciaService: GerenciaService) {
        this.updatePaginatedGerencias();
    }

    get totalPages() {
        return Math.ceil(this.gerencias.length / this.itemsPerPage);
    }

    updatePaginatedGerencias() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedGerencias = this.gerencias.slice(start, end);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePaginatedGerencias();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedGerencias();
        }
    }

    pages() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    goToPage(page: number) {
        this.currentPage = page;
        this.updatePaginatedGerencias();
    }

    mostrarModalEliminar: boolean = false;
    eliminar() {
        this.mostrarModalEliminar = true;  
    }

    cerrarModalEliminar() {
        this.mostrarModalEliminar = false; 
    }

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
        }
    }

    async cargarGerencias() {
        if (this.selectedFile) {
            try {
                await this.gerenciaService.uploadMissiveGerencia(this.selectedFile);
                console.log('Gerencias cargadas exitosamente');
            } catch (error) {
                console.error('Error al cargar gerencias:', error);
            }
        } else {
            console.error('No se ha seleccionado ningún archivo.');
        }
    }
}
