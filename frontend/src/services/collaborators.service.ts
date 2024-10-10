import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { environment } from '../environment/environment'; 

@Injectable({ providedIn: 'root' })
export class CollaboratorService {
  constructor(private _httpClient: HttpClient) {}

  uploadMissiveCollaborator(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('fileData', file);

    return lastValueFrom(this._httpClient.post(`${environment.apiUrl}collaborators/UploadMassive`, formData));
}

  
  

  getCollaborators(): Promise<any> {
    return lastValueFrom(this._httpClient.get('https://localhost:5001/api/collaborators'));
  }
}
