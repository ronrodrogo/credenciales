import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [CommonModule, FormsModule], // Agrega FormsModule aquí
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {
  searchQuery: string = '';

  onSearch() {
    console.log('Buscar:', this.searchQuery);
  }

  onUpload() {
    console.log('Carga masiva de documentos');
  }
}
