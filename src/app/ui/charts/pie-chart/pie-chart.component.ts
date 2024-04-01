import { Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: '<div #pieChartContainer></div>',
})
export class PieChartComponent {
  @ViewChild('pieChartContainer', { static: true })
  barChartContainer!: ElementRef;

  data = input<{ name: string; value: number }[]>([]);

  chartSize = output<{ width: number; height: number }>();

  private width: number = 185;

  private height: number = 185;

  private svg: any;

  private arc!: d3.Arc<any, { name: string; value: number; }>;

  private radius: number = Math.min(this.width, this.height) / 2;

  hasChartUpdate: boolean = false;

  currentAngle: number = 0;

  constructor() {
    effect(() => {
      const newChartData = this.data();

      if (this.hasChartUpdate) {
        this.updatePieChart();
      } else {
        if (newChartData?.length) {
          this.createPieChart();
          this.hasChartUpdate = true;
        }
      }

    });
  }

  private createPieChart() {
    this.chartSize.emit({ width: this.width, height: this.height });

    this.svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    this.updatePieChart();
  }

  private updatePieChart() {
    if (!this.data()) return;

    let color = this.getChartColors();

    const pie = d3.pie<{ name: string; value: number }>().value(d => d.value);

    // Created arc for the pie chart
    this.arc = d3.arc<any, { name: string; value: number }>()
      .outerRadius(this.radius - 10)
      .innerRadius(0)

    // update al paths with the new data
    const update = this.svg.selectAll('path')
      .data(pie(this.data()));

    // merg the new data with the old paths
    update.enter()
      .append('path')
      .merge(update)
      .transition()
      .duration(750)
      .attrTween('d', (d: any) => this.arcTween(d))
      .attr('fill', (d: any, i: number) => color(i.toString()));

    update.exit()
      .transition()
      .duration(750)
      .attrTween('d', (d: any) => this.arcTween(d))
      .remove();

    // Add text labels to the arcs
    const text = this.svg.selectAll('text')
      .data(pie(this.data()));

    text.enter()
      .append('text')
      .merge(text)
      .transition()
      .duration(750)
      .attr('transform', (d: any) => `translate(${this.arc.centroid(d)})`)
      .attr('text-anchor', 'middle')
      .style('fill', () => 'var(--mat-badge-text-color)')
      .text((d: any) => d.data.name);

    text.exit()
      .transition()
      .duration(750)
      .attr('transform', (d: any) => `translate(${this.arc.centroid(d)})`)
      .remove();
  }

  private arcTween(a: any) {
    const i = d3.interpolate(this.currentAngle, a.startAngle);
    this.currentAngle = a.startAngle;

    return (t: number) => {
      a.startAngle = i(t);
      a.endAngle = i(t) + a.endAngle - a.startAngle;
      return this.arc(a);
    };
  }

  private getChartColors() {
    return d3.scaleOrdinal(d3.schemeTableau10);
  }
}
