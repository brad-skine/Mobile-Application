import {Component} from '@angular/core';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
import { MonthlyChartComponent } from "./components/monthly-chart/monthly-chart";
import { ImportButtonComponent } from "./components/import_data/import_data";
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionListComponent, MonthlyChartComponent, ImportButtonComponent],
  templateUrl: "./app.html",
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'homes';
}
