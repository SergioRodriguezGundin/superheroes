import { Injectable } from '@angular/core';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root',
})
export class ChartsService {
  //createBarChart(data: MarvelHero[], element: HTMLElement) {
  //  const width = 500;
  //  const height = 300;

  //  const y = d3.scaleLinear()
  //    .domain([0, d3.max(data, d => d.nameLabel)]).nice()
  //    .range([height, 0]);

  //  const x = d3.scaleBand()
  //    .domain(data.map(d => d.nameLabel))
  //    .range([0, width])
  //    .padding(0.1);

  //  const svg = d3.select(element).append("svg")
  //    .attr("viewBox", [0, 0, width, height]);

  //  svg.selectAll("rect")
  //    .data(data)
  //    .join("rect")
  //    .attr("x", d => x(d.nameLabel))
  //    .attr("y", d => y(d.value))
  //    .attr("height", d => y(0) - y(d.value))
  //    .attr("width", x.bandwidth());
  //}
}