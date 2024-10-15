import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NuevoColaboradorComponent } from '../nuevo-colaborador/nuevo-colaborador.component';
import { EliminarComponent } from '../eliminar/eliminar.component';
import { ModificarComponent } from '../modificar/modificar.component';
import { Router } from '@angular/router';
import { CollaboratorService } from '../../services/collaborators.service';
interface Colaborador {
    nombre: string;
    rut: string;
    segmento: string;
    gerencia: string;
    cargo: string;
    celular: string;
    correo: string;
    color_id: string;
}

@Component({
    selector: 'app-colaboradores',
    standalone: true,
    imports: [ModificarComponent, CommonModule, NuevoColaboradorComponent, EliminarComponent],
    templateUrl: './colaboradores.component.html',
    styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {
    colaboradores: Colaborador[] = []; 
    paginatedColaboradores: Colaborador[] = [];
    currentPage = 1;
    itemsPerPage = 7;
    selectedColaborador: Colaborador | null = null; 

    mostrarFormulario: boolean = false;
    mostrarModificar: boolean = false; 
    mostrarModalEliminar: boolean = false; 

    constructor(private CollaboratorService: CollaboratorService, private router: Router) {
        this.updatePaginatedColaboradores();
    }

    get totalPages() {
        return Math.ceil(this.colaboradores.length / this.itemsPerPage);
    }

    updatePaginatedColaboradores() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        this.paginatedColaboradores = this.colaboradores.slice(start, end);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePaginatedColaboradores();
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePaginatedColaboradores();
        }
    }

    pages() {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
  
    goToPage(page: number) {
        this.currentPage = page;
        this.updatePaginatedColaboradores();
    }

    abrirFormulario() {
        this.selectedColaborador = null; 
        this.mostrarFormulario = true; 
        this.mostrarModificar = false; 
    }

    cerrarFormulario() {
        this.mostrarFormulario = false;
        this.mostrarModificar = false; 
    }

    eliminar() {
        this.mostrarModalEliminar = true;  
    }

    cerrarModalEliminar() {
        this.mostrarModalEliminar = false; 
    }

    editar(colaborador: Colaborador) {
        this.selectedColaborador = colaborador; 
        this.mostrarFormulario = false; 
        this.mostrarModificar = true; 
    }

    onReimprimir(colaborador: Colaborador) {
        // Guardar el colaborador en el servicio y navegar a la pantalla de "Generar Credencial"
        this.CollaboratorService.setColaborador(colaborador);
        this.router.navigate(['/generar']); // Navega a la ruta donde está el componente "Generar Credencial"
    }
}
