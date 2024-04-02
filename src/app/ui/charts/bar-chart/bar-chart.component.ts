import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, input, output } from '@angular/core';
import { ChartService } from '../../../core/charts/charts.service';
import { ChartData } from '../../../core/charts/charts.interface';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  template: `<div class="bar-chart" #barChartContainer></div><div [attr.id]="'tooltip' + chartId()" class="tooltip"></div>`,
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  private chartService = inject(ChartService);

  @ViewChild('barChartContainer', { static: true })
  barChartContainer!: ElementRef;

  data = input<ChartData[]>([]);

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
    this.chartService.createChart(`chart${this.chartId()}`, this.barChartContainer, this.data(),
      {
        type: 'bar',
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
