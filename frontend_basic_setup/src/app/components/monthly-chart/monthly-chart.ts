import { Component, computed, inject } from '@angular/core';
import { MonthlySalesModel } from 'src/app/models/monthly_sale.model';
import { monthlySalesService } from 'src/app/services/monthly_sales.service';
import { Observable } from 'rxjs';
import { CommonModule} from '@angular/common';
import { NgxEchartsDirective, provideEchartsCore} from 'ngx-echarts';
import { toSignal } from '@angular/core/rxjs-interop';

import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent
} from 'echarts/components';

import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  CanvasRenderer,
  LegendComponent
]);

@Component({
  selector: 'app-monthly-chart',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './monthly-chart.html',
  styleUrls: ['./monthly-chart.scss'],
  providers: [provideEchartsCore({echarts})]
})

export class MonthlyChartComponent{

  monthly_sales: MonthlySalesModel[] = [];
  protected monthlySalesService = inject(monthlySalesService); 
  loading = true;
  error: string | null = null; // so can check if error then display it

   monthlySales = toSignal(this.monthlySalesService.getAllMonthlySales(
    ), {initialValue: []});

  chartOptions = computed(() => {
      const data = this.monthlySales();
      if (!data.length) return null;

      return {

        title: {
          text: 'Monthly Income vs Expense',
          left: 'center',
          textStyle: {
            color: '#cbd5f5'
          }
        },
        tooltip: { trigger: 'axis' },
        legend: {
          data: ['Income', 'Expense'],
          top: 36
        },
        grid: {
          left: 40,
          right: 20,
          bottom: 50,
          top: 70
        },
        xAxis: {
          type: 'category',
          data: data.map(s => `${s.month } ${s.year}`),
          axisLabel: { rotate: 45 }
        },
        yAxis: { type: 'value' },
        series: [
          {
            name: 'Income',
            type: 'bar',
            data: data.map(s => s.income),
            itemStyle: { color: '#4caf50' }
          },
          {
            name: 'Expense',
            type: 'bar',
            data: data.map(s => s.expense),
            itemStyle: { color: '#f44336' }
          }
        ]
      };
    });
}





