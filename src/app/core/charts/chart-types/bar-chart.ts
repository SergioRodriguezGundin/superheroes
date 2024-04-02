import { ElementRef } from '@angular/core';
import { ChartConfig, ChartData, ChartFactory, ChartInstance } from '../charts.interface';
import * as d3 from 'd3';

export class BarChart implements ChartFactory {
  private height: number = 0;

  private colors: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeTableau10);

  createChart(element: ElementRef, chartConfiguration: ChartConfig): ChartInstance {
    const { chartId, width, height, margin } = chartConfiguration;
    const _width = width - margin.left - margin.right;
    this.height = height - margin.top - margin.bottom;

    const svg = d3.select(element.nativeElement)
      .append('svg')
      .attr('width', _width)
      .attr('height', this.height)
      .append('g');

    const x = d3.scaleBand()
      .range([0, width])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([this.height, 0]);

    const tooltip = d3.select(chartId);

    return { svg, x, y, tooltip };
  }

  updateChart(data: ChartData[], instance: ChartInstance): void {
    if (!data) return;

    instance.x.domain(data.map(d => d.name)); instance.y.domain([0, d3.max(data, d => d.value)]);

    const update = instance.svg.selectAll('.bar')
      .data(data);

    update.enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d: { name: string; value: number }) => instance.x(d.name))
      .attr('width', instance.x.bandwidth())
      .attr('y', (d: { name: string; value: number }) => instance.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - instance.y(d.value))
      .on('mouseover', (event: any, d: any) => this.showTooltip(event, d, instance))
      .on('mouseout', () => this.hideTooltip(instance))
      .merge(update)
      .transition()
      .duration(750)
      .attr('x', (d: { name: string; value: number }) => instance.x(d.name))
      .attr('width', instance.x.bandwidth())
      .attr('y', (d: { name: string; value: number }) => instance.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - instance.y(d.value))
      .attr('fill', (d: any, i: number) => i >= 10 ? 'var(--mat-badge-background-color)' : this.colors(i.toString()));

    update.exit()
      .transition()
      .duration(750)
      .attr('y', (d: { name: string; value: number }) => instance.y(d.value))
      .attr('height', (d: { name: string; value: number }) => this.height - instance.y(d.value))
      .remove();
  }

  showTooltip(event: any, data: ChartData, instance: ChartInstance) {
    const tooltipWidth = instance.tooltip.node().offsetWidth;

    const left = instance.x(data.name) + instance.x.bandwidth() / 2 - tooltipWidth / 2;
    const top = instance.y(data.value);

    instance.tooltip
      .style("display", "block")
      .style('left', `${left}px`)
      .style('top', `${top}px`)
      .html(`
      <small>${data.name}</small>: <span>${data.value}</span>
    `)
  }

  hideTooltip(instance: ChartInstance) {
    instance.tooltip.style("display", "none");
  }
}