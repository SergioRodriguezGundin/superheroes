import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, input, output } from '@angular/core';
import { Chart, ChartData } from '../../core/charts/charts.interface';
import { ChartService } from '../../core/charts/charts.service';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  template: `<div class="bar-chart" #chartContainer></div><div [attr.id]="'tooltip' + chartId()" class="tooltip"></div>`,
  styleUrl: './chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  private chartService = inject(ChartService);

  @ViewChild('chartContainer', { static: true })
  chartContainer!: ElementRef;

  data = input<ChartData[]>([]);

  chartType = input<Chart>('bar');

  chartId = input<number>(0);

  width = input<number>(185);

  height = input<number>(185);

  chartSize = output<{ width: number; height: number }>();

  hasChartUpdate: boolean = false;

  constructor() {
    effect(() => {
      const newChartData = this.data();

      if (this.hasChartUpdate) {
        this.updateBarChart();
      } else {
        if (newChartData?.length) {
          this.createBarChart();
          this.hasChartUpdate = true;
        }
      }
    });
  }

  private createBarChart() {
    this.chartService.createChart(`chart${this.chartId()}`, this.chartContainer, this.data(),
      {
        type: this.chartType(),
        chartId: `#tooltip${this.chartId()}`,
        width: this.width(),
        height: this.height(),
        margin: { top: 0, right: 0, bottom: 0, left: 0 }
      });
    this.chartSize.emit({ width: this.width(), height: this.height() });
  }

  private updateBarChart() {
    this.chartService.updateChart(`chart${this.chartId()}`, this.data());
  }
}
