import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionModel } from 'src/app/models/transaction.model';
import { TransactionService } from 'src/app/services/transaction.service';


@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transaction-list.html',
  styleUrls: ['./transaction-list.scss'],
})


export class TransactionListComponent implements OnInit {

  transactions: TransactionModel[] = [];
  private transactionService = inject(TransactionService); 
  loading = true;
  error: string | null = null; // so can check if error then display it

  ngOnInit(): void {
    
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
      this.transactions = data;
      this.loading = false;
    },
    error: (err) => {
      // this.error = 'Failed to load transactions.';
      // console.error(err);
      this.error = 'Failed to load transactions.';
      this.loading = false;
    }
  });
}
}
