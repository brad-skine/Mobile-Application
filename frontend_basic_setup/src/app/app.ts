import {Component} from '@angular/core';
import { TransactionListComponent } from './components/transaction-list/transaction-list';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransactionListComponent],
  templateUrl: "./app.html",
  styleUrls: ['./app.scss'],
})
export class App {
  title = 'homes';
}
