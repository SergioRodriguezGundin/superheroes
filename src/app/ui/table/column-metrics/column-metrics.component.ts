import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';
import { BarChartComponent } from '../../charts/bar-chart/bar-chart.component';
import { PieChartComponent } from '../../charts/pie-chart/pie-chart.component';
import { ColumnSummaryComponent } from '../column-summary/column-summary.component';

@Component({
  selector: 'app-column-metrics',
  standalone: true,
  imports: [CommonModule, BarChartComponent, PieChartComponent, ColumnSummaryComponent],
  templateUrl: './column-metrics.component.html',
  styleUrl: './column-metrics.component.scss'
})
export class ColumnMetricsComponent {
  data = input<{ name: string; value: number }[]>([]);

  @Input() isFirstColumn = false;

  chartWidth = 120;

  public setChartSize(size: { width: number; height: number }) {
    this.chartWidth = size.width;
  }

}
