import { Component, Output, EventEmitter } from '@angular/core';
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
  @Output() colaboradoresActualizados = new EventEmitter<any[]>(); 

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
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0]; 
      console.log('Archivo seleccionado:', this.selectedFile.name);
      
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const fileContent = e.target.result;
        console.log('Contenido del archivo:', fileContent); 
      };
      reader.readAsText(this.selectedFile); 
    } else {
      this.selectedFile = null;
      console.log('No se ha seleccionado ningún archivo.');
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
