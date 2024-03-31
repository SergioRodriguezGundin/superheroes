import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, input } from '@angular/core';
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
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    //const width = 780 - margin.left - margin.right;
    //const height = 200 - margin.top - margin.bottom;

    const svg = d3.select(this.barChartContainer.nativeElement)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%');


    svg.selectAll('rect')
      .data(this.data())
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 15)
      .attr('y', (d) => 150 - d.value)
      .attr('width', 10)
      .attr('height', (d) => d.value)
      .attr('fill', 'green');


    //const x = d3.scaleBand()
    //  .range([0, width])
    //  .domain(this.data().map(d => d.name))
    //  .padding(0.1);

    //const y = d3.scaleLinear()
    //  .range([height, 0])
    //  .domain([0, 50]);

    //svg.append('g')
    //  .attr('transform', `translate(0,${height})`)
    //  .call(d3.axisBottom(x));

    //svg.append('g')
    //  .call(d3.axisLeft(y));

    //svg.selectAll('rect')
    //  .data(this.data())
    //  .enter()
    //  .append('rect')
    //  .attr('x', d => x(d.name)!)
    //  .attr('y', d => y(d.value))
    //  .attr('width', x.bandwidth())
    //  .attr('height', d => height - y(d.value))
    //  .attr('fill', 'green');
  }
}
