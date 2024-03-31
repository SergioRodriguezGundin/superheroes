import { Component, ElementRef, ViewChild, effect, input } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: '<div #pieChartContainer></div>',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  private width: number = 185;

  private height: number = 185;

  // TODO: @SergioRodriguezGundin - replace for T generic type
  data = input<{ name: string; value: number }[]>([]);

  @ViewChild('pieChartContainer', { static: true })
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
    const radius = Math.min(this.width, this.height) / 2;

    const svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2},${this.height / 2})`);

    const color = d3.scaleOrdinal(['var(--mdc-switch-selected-focus-state-layer-color)', 'var(--mdc-switch-selected-track-color)']);

    const pie = d3.pie<{ name: string; value: number }>()
      .value(d => d.value);

    const arc = d3.arc<d3.PieArcDatum<{ name: string; value: number }>>()
      .outerRadius(radius - 10)
      .innerRadius(0);

    const arcs = svg.selectAll('arc')
      .data(pie(this.data()))
      .enter()
      .append('g')
      .attr('class', 'arc');

    arcs.append('path')
      .attr('d', arc)
      .attr('fill', (_, i) => color(i.toString()));

    arcs.append('text')
      .attr('transform', d => `translate(${arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .text(d => d.data.name);
  }

}
