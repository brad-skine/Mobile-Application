import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { importDataService } from './import_data.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { monthlySalesService } from 'src/app/services/monthly_sales.service';
import { TypeSummaryService } from '../type_pie_chart/type_summary.service';
@Component({
  selector: 'app-import_button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import_data.html',
  styleUrls: ['./import_data.scss'],
}) 
export class ImportButtonComponent{
    private importService = inject(importDataService); 
    private transactionService = inject(TransactionService);
    private monthlySalesService = inject(monthlySalesService)
    private typeSummaryService = inject(TypeSummaryService);
    // import_result$: Observable<string> = this.importService.importData();

    uploadStatus = signal<'idle' | 'success' | 'error'>('idle');
    
    onFileSelect(input: HTMLInputElement): void {
        // this.importService.importData();
        if (input == null || input.files == null) {
            console.error("null input")
            return
        }
    
        const file = input.files[0]
        this.importService.importData(file).subscribe({
            next: () => {
                console.log('Import success')
                this.uploadStatus.set('success');
                this.transactionService.triggerRefresh();
                this.monthlySalesService.triggerRefresh();
                this.typeSummaryService.triggerRefresh();

            },
            error: err => {
                console.error('Import failed', err)
                this.uploadStatus.set('error')
            }
        });
    
    }

    
}


