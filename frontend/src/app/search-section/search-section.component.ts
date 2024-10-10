import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CollaboratorService } from '../../services/collaborators.service';

@Component({
  selector: 'app-search-section',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-section.component.html',
  styleUrls: ['./search-section.component.css']
})
export class SearchSectionComponent {
  searchQuery: string = '';
  isDropdownVisible: boolean = false; 
  selectedOption: string | null = null; 
  selectedFile: File | null = null; 

  constructor(private collaboratorService: CollaboratorService) {}

  onSearch() {
    console.log('Buscar:', this.searchQuery);
  }

  onUpload() {
    this.isDropdownVisible = !this.isDropdownVisible; 
    console.log('Carga masiva de documentos');
  }

  onLoadOption(option: string) {
    console.log('Opción seleccionada:', option);
    this.selectedOption = option; 
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; 
    if (this.selectedFile) {
      console.log('Archivo seleccionado:', this.selectedFile.name);
    } else {
      console.log('No se seleccionó ningún archivo.');
    }
  }
  

  onLoadExcel() {
    if (this.selectedFile && this.selectedOption) {
      this.collaboratorService.uploadMissiveCollaborator(this.selectedFile)
        .then(response => {
          console.log('Carga exitosa:', response);
        })
        .catch(error => {
          console.error('Error en la carga:', error);
        });
    } else {
      console.warn('Por favor, selecciona un archivo y una opción.');
    }
  }
}
