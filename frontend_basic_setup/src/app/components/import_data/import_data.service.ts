import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root',})
  export class importDataService {
    private apiUrl = "https://localhost:7283/api/import/transactions";
    private http = inject(HttpClient)

    importData(csvData: File) {
      const formData = new FormData();
      formData.append('file', csvData);
        return this.http.post<void>(this.apiUrl, formData);
    }

  }