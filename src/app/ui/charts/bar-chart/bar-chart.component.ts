import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [],
  template: `<div class="bar-chart" #barChartContainer></div><div [attr.id]="'tooltip' + chartId()" class="tooltip"></div>`,
  styleUrl: './bar-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent {
  @ViewChild('barChartContainer', { static: true })
  barChartContainer!: ElementRef;

  data = input<{ name: string; value: number }[]>([]);

  chartId = input<number>(0);

  chartSize = output<{ width: number; height: number }>();

  private svg: any;

  private tooltip: any;

  private width: number = 185;

  private height: number = 185;

  private x: any;

  private y: any;

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
    this.chartSize.emit({ width: this.width, height: this.height });

    this.svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g');

    this.x = d3.scaleBand()
      .range([0, this.width])
      .padding(0.1);

    this.y = d3.scaleLinear()
      .range([this.height, 0]);

    this.tooltip = d3.select(`#tooltip${this.chartId()}`);

    this.updateBarChart();
  }

  private updateBarChart() {
    if (!this.data) return;

    this.x.domain(this.data().map(d => d.name));
    this.y.domain([0, d3.max(this.data(), d => d.value)]);

    const update = this.svg.selectAll('.bar')
      .data(this.data);

    update.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { name: string; value: number }) => this.x(d.name))
      .attr('width', this.x.bandwidth())
      .attr('y', (d: { name: string; value: number }) => this.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - this.y(d.value))
      .on('mouseover', (event: any, d: { name: string; value: number }) => this.showTooltip(d))
      .on('mouseout', () => this.hideTooltip())
      .merge(update)
      .transition()
      .duration(750)
      .attr('x', (d: { name: string; value: number }) => this.x(d.name))
      .attr('width', this.x.bandwidth())
      .attr('y', (d: { name: string; value: number }) => this.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - this.y(d.value))
      .attr('fill', (d: any, i: number) => i >= 10 ? 'var(--mat-badge-background-color)' : d3.schemeCategory10[i]);

    update.exit()
      .transition()
      .duration(750)
      .attr('y', (d: { name: string; value: number }) => this.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - this.y(d.value))
      .remove();
  }

  private showTooltip(data: { name: string; value: number }) {
    const tooltipWidth = this.tooltip.node().offsetWidth;

    const left = this.x(data.name) + this.x.bandwidth() / 2 - tooltipWidth / 2;
    const top = this.y(data.value);

    this.tooltip
      .style('opacity', 1)
      .style('left', `${left}px`)
      .style('top', `${top}px`)
      .html(`
        <small>${data.name}</small>: <span>${data.value}</span>
      `)
  }

  private hideTooltip() {
    this.tooltip
      .style('opacity', 0);
  }

  // - This method is to set the chart size fit to the data
  private updateChartSizeByData() {
    // - barlength is the width of the bar
    const barLength = this.data().length < 5 ? this.data().length * 10 : 15;

    // - xlength is the space between the bars
    const xlength = barLength + this.data().length;

    // - width is the total width of the chart
    this.width = (this.data().length * xlength);
    this.height = (this.data().length * xlength);
  }
}
