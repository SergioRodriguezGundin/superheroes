import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { ChartComponent } from '../../chart/chart.component';
import { ColumnSummaryComponent } from '../column-summary/column-summary.component';
import { ChartData } from '../../../core/charts/charts.interface';

@Component({
  selector: 'app-column-metrics',
  standalone: true,
  imports: [CommonModule, ChartComponent, ColumnSummaryComponent],
  templateUrl: './column-metrics.component.html',
  styleUrl: './column-metrics.component.scss'
})
export class ColumnMetricsComponent {
  data = input<ChartData[]>([]);

  columnIndex = input<number>(0);

  @Input() isFirstColumn = false;

  chartWidth = 120;


  public setChartSize(size: { width: number; height: number }) {
    this.chartWidth = size.width;
  }

}
