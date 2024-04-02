import { Component, ElementRef, ViewChild, effect, inject, input, output } from '@angular/core';
import { ChartService } from '../../../core/charts/charts.service';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: `<div #pieChartContainer></div><div [attr.id]="'tooltip' + chartId()" class="tooltip"></div>`,
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  private chartSerice = inject(ChartService);

  @ViewChild('pieChartContainer', { static: true })
  pieChartContainer!: ElementRef;

  data = input<{ name: string; value: number }[]>([]);

  chartId = input<number>(0);

  width = input<number>(185);

  height = input<number>(185);

  chartSize = output<{ width: number; height: number }>();
  updateChart: boolean = false;

  currentAngle: number = 0;

  constructor() {
    effect(() => {
      const newChartData = this.data();

      if (this.updateChart) {
        this.updatePieChart();
      } else {
        if (newChartData?.length) {
          this.createPieChart();
          this.updateChart = true;
        }
      }

    });
  }

  private createPieChart() {
    this.chartSerice.createChart(`chart${this.chartId()}`, this.pieChartContainer, this.data(), {
      type: 'pie',
      chartId: `#tooltip${this.chartId()}`,
      width: this.width(),
      height: this.height(),
      margin: { top: 0, right: 0, bottom: 0, left: 0 }
    });
    this.chartSize.emit({ width: this.width(), height: this.height() });
  }


  private updatePieChart() {
    this.chartSerice.updateChart(`chart${this.chartId()}`, this.data());
  }
}
