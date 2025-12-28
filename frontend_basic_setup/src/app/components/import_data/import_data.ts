import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { importDataService } from './import_data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-import_button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './import_data.html',
  styleUrls: ['./import_data.scss'],
}) 
export class ImportButtonComponent{
    private importService = inject(importDataService); 
    // import_result$: Observable<string> = this.importService.importData();
    onFileSelect(input: HTMLInputElement): void {
        // this.importService.importData();
        if (input == null || input.files == null) {
            console.error("null input")
            return
        }

        const file = input.files[0]
        this.importService.importData(file).subscribe({
            next: () => console.log('Import success'),
            error: err => console.error('Import failed', err)
        });
    
    }

    
}


