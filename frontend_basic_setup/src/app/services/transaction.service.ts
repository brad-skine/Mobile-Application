import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TransactionModel } from '../models/transaction.model';

@Injectable({providedIn: 'root',})
  export class TransactionService {
    private apiUrl = "https://localhost:7283/api/transactions/all";

    constructor(private http: HttpClient) {}

    getAllTransactions(): Observable<TransactionModel[]> {
      return this.http.get<TransactionModel[]>(this.apiUrl);
    }
  }
