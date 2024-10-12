import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SegmentService {
  private apiUrl = 'https://localhost:5001/api/segment';

  constructor(private http: HttpClient) {}

  uploadMissiveSegment(file: File): Promise<any> {
    const formData = new FormData();
    formData.append('FileData', file);
    return this.http.post(`${this.apiUrl}/UploadMassive`, formData).toPromise();
  }

  getAllSegmentPaginated(params: any = {}): Promise<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/paginated`, { params }).toPromise().then(data => {
      return data || []; 
    });
  }
}
