import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import { MarvelHero } from '../../../feature/marvel/interfaces/marvel.interface';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  template: '<div #barChartContainer></div>',
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  private chart: d3.Selection<SVGSVGElement, unknown, null, undefined> | undefined;

  private width: number = 0;

  private height: number = 0;

  chartSize = output<{ width: number; height: number }>();

  // TODO: @SergioRodriguezGundin - replace for T generic type
  data = input<{ name: string; value: number }[]>([]);

  @ViewChild('barChartContainer', { static: true })
  barChartContainer!: ElementRef;

  constructor() {
    effect(() => {
      const newChartData = this.data();
      if (newChartData.length) {
        this.initializeChart();
      }
    });
  }

  private initializeChart() {
    const barLength = this.data().length < 5 ? this.data().length * 10 : 15;
    const xlength = barLength + 6;
    this.width = (this.data().length * xlength);
    this.chartSize.emit({ width: this.width, height: this.height });

    const svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', 'auto');


    svg.selectAll('rect')
      .data(this.data())
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * xlength)
      .attr('y', (d) => 120 - d.value)
      .attr('width', barLength)
      .attr('height', (d) => d.value)
      .attr('fill', 'green');
  }
}
