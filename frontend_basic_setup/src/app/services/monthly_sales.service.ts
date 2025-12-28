import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MonthlySalesModel } from '../models/monthly_sale.model';

@Injectable({providedIn: 'root',})
  export class monthlySalesService {
    private apiUrl = "https://localhost:7283/api/transactions/summary/monthly";
    private http = inject(HttpClient);
    getAllMonthlySales(): Observable<MonthlySalesModel[]> {
      return this.http.get<MonthlySalesModel[]>(this.apiUrl);
    }
  }
