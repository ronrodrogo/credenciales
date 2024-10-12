import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GerenciaService {
  private apiUrl = 'http://localhost:5001/api/gerencia/UploadMassive';

  constructor(private http: HttpClient) {}

  uploadMissiveGerencia(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('FileData', file);
    return this.http.post(this.apiUrl, formData).toPromise();
  }
}
