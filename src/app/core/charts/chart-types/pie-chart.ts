import { ElementRef } from '@angular/core';
import { ChartConfig, ChartData, ChartFactory, ChartInstance } from '../charts.interface';
import * as d3 from 'd3';

export class PieChart implements ChartFactory {
  private arc: any;

  private radius: number = 0;

  private colors: d3.ScaleOrdinal<string, string> = d3.scaleOrdinal(d3.schemeTableau10);

  private oldPieData: { startAngle: number; endAngle: number }[] = [];

  createChart(element: ElementRef, chartConfiguration: ChartConfig): ChartInstance {
    const { chartId, width, height, margin } = chartConfiguration;
    const _width = width - margin.left - margin.right;
    const _height = height - margin.top - margin.bottom;
    this.radius = Math.min(width, height) / 2;

    const svg = d3.select(element.nativeElement)
      .append('svg')
      .attr('width', _width)
      .attr('height', _height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const tooltip = d3.select(chartId);

    return { svg, tooltip, x: null, y: null };
  }

  updateChart(data: ChartData[], instance: ChartInstance): void {
    if (!data) return;

    const pie = d3.pie<ChartData>().value(d => d.value);

    // Store the old angles to interpolate that angles with the new incoming angles and animate with pieTween
    this.oldPieData = pie(data).map((data: any) => {
      return { startAngle: data.startAngle, endAngle: data.endAngle };
    });

    this.arc = d3.arc<any, ChartData>()
      .startAngle((d: any) => d.startAngle)
      .endAngle((d: any) => d.endAngle)
      .outerRadius(this.radius)
      .innerRadius(0)

    const paths = instance.svg.selectAll('path')
      .data(pie(data));

    paths.enter()
      .append('svg:path')
      .attr("stroke", "var(--mat-app-background-color)")
      .attr("stroke-width", 1.5)
      .attr('fill', (d: any, i: number) => this.colors(i.toString()))
      .on('mousemove', (event: any, d: any) => this.showTooltip(event, d, instance))
      .on('mouseout', () => this.hideTooltip(instance))
      .transition()
      .duration(750)
      .attrTween('d', (d: any) => this.pieTween(d, d.index));

    paths.transition().duration(750).attrTween('d', (d: any) => this.pieTween(d, d.index));

    paths.exit()
      .transition()
      .duration(750)
      .attrTween('d', (d: any) => this.removePieTween(d, d.index))
      .remove();
  }

  showTooltip(event: any, value: any, instance: ChartInstance): void {
    const { data } = value;
    instance.tooltip.style("left", (event.offsetX + data.name.length) + "px");
    instance.tooltip.style("top", (event.offsetY - data.name.length) + "px");
    instance.tooltip.style("display", "block");
    instance.tooltip.html((data.name) + ": " + (data.value));
  }

  hideTooltip(instance: ChartInstance): void {
    instance.tooltip.style("display", "none");
  }

  /**
   * 
   * pieTween is used to create a smooth transition like a clock and update the pie chart arcs
   * 
   * @param d - arc information to calculate the start and end angle
   * @param i - index of the arc
   * @returns 
   */
  private pieTween(d: any, i: any) {
    var s0;
    var e0;
    if (this.oldPieData[i]) {
      s0 = this.oldPieData[i].startAngle;
      e0 = this.oldPieData[i].endAngle;
    } else if (!(this.oldPieData[i]) && this.oldPieData[i - 1]) {
      s0 = this.oldPieData[i - 1].endAngle;
      e0 = this.oldPieData[i - 1].endAngle;
    } else if (!(this.oldPieData[i - 1]) && this.oldPieData.length > 0) {
      s0 = this.oldPieData[this.oldPieData.length - 1].endAngle;
      e0 = this.oldPieData[this.oldPieData.length - 1].endAngle;
    } else {
      s0 = 0;
      e0 = 0;
    }
    i = d3.interpolate({ startAngle: s0, endAngle: e0 }, { startAngle: d.startAngle, endAngle: d.endAngle });
    return (t: any) => {
      var b = i(t);
      return this.arc(b);
    };
  }

  private removePieTween(d: any, i: any) {
    const s0 = 2 * Math.PI;
    const e0 = 2 * Math.PI;
    i = d3.interpolate({ startAngle: d.startAngle, endAngle: d.endAngle }, { startAngle: s0, endAngle: e0 });
    return (t: any) => {
      var b = i(t);
      return this.arc(b);
    };
  }
}