import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Area {
  centro_coste: string;
  fecha: string;
  editado: string;
  estado: string;
}
@Component({
  selector: 'app-areas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './areas.component.html',
  styleUrl: './areas.component.css'
})
export class AreasComponent {
   areas: Area[] = [
    {
      centro_coste: 'Nombre Apellido',
      fecha: '000000',
      editado: '0000000',
      estado: 'activo',
    },
  ];
  paginatedColaboradores: Area[] = [];
  currentPage = 1;
  itemsPerPage = 7;

  constructor() {
    this.updatePaginatedColaboradores();
  }

  get totalPages() {
    return Math.ceil(this.areas.length / this.itemsPerPage);
  }

  updatePaginatedColaboradores() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedColaboradores = this.areas.slice(start, end);
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
}
