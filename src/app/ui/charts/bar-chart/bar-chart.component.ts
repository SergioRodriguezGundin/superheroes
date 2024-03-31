import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
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
      if (newChartData?.length) {
        this.initializeChart();
      }
    });
  }

  private initializeChart() {
    // - barlength is the width of the bar
    const barLength = this.data().length < 5 ? this.data().length * 10 : 15;

    // - xlength is the space between the bars
    const xlength = barLength + this.data().length;

    // - width is the total width of the chart
    this.width = (this.data().length * xlength);
    this.height = (this.data().length * xlength);
    this.chartSize.emit({ width: this.width, height: this.height });

    const svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)

    const x = d3.scaleBand().rangeRound([0, this.width - this.data().length]).domain(this.data().map((d) => d.name));

    const xAxis = d3.axisBottom(x).tickValues([this.data()[0].name, this.data()[this.data().length - 1].name]);

    // - append the x axis to the svg. this.height * 0.80 is the position of the x axis (80% of the height of the svg)
    svg.append('g')
      .attr('transform', `translate(0 ,${this.height * 0.80})`)
      .call(xAxis);

    // - append the bars to the svg. (this.height * 0.75) - d.value) is the position of the bars (75% of the height of the svg)
    svg.selectAll('rect')
      .data(this.data())
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * xlength)
      .attr('y', (d) => (this.height * 0.75) - d.value)
      .attr('width', barLength)
      .attr('height', (d) => d.value)
      .attr('fill', 'var(--mdc-switch-selected-focus-state-layer-color)');
  }
}
