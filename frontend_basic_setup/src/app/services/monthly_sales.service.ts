import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';
import { MonthlySalesModel } from '../models/monthly_sale.model';

@Injectable({providedIn: 'root',})
  export class monthlySalesService {
    private apiUrl = "https://localhost:7283/api/transactions/summary/monthly";
    private http = inject(HttpClient);

    private refresh$ = new BehaviorSubject<void>(undefined)

    getAllMonthlySales(): Observable<MonthlySalesModel[]> {
      return this.refresh$.pipe(
          switchMap(() =>this.http.get<MonthlySalesModel[]>(this.apiUrl))
    );

    }

    triggerRefresh() {
      this.refresh$.next();
    }
  }
