import { Component, ElementRef, ViewChild, effect, input, output } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  template: `<div #pieChartContainer></div><div [attr.id]="'tooltip' + chartId()" class="tooltip"></div>`,
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  @ViewChild('pieChartContainer', { static: true })
  barChartContainer!: ElementRef;

  data = input<{ name: string; value: number }[]>([]);

  chartId = input<number>(0);

  chartSize = output<{ width: number; height: number }>();

  private oldPieData: { startAngle: number; endAngle: number }[] = [];

  private width: number = 185;

  private height: number = 185;

  private svg: any;

  private arc!: d3.Arc<any, { name: string; value: number; }>;

  private radius: number = Math.min(this.width, this.height) / 2;

  updateChart: boolean = false;

  currentAngle: number = 0;

  color: d3.ScaleOrdinal<string, string> = this.getChartColors();

  tooltip: any;

  constructor() {
    effect(() => {
      const newChartData = this.data();

      if (this.updateChart) {
        this.updatePieChart();
      } else {
        if (newChartData?.length) {
          this.createPieChart();
          this.updateChart = true;
        }
      }

    });
  }

  private createPieChart() {
    this.tooltip = d3.select(`#tooltip${this.chartId()}`);

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

    const pie = d3.pie<{ name: string; value: number }>().value(d => d.value);

    // Store the old angles to interpolate that angles with the new incoming angles and animate with pieTween
    this.oldPieData = pie(this.data()).map((data: any) => {
      return { startAngle: data.startAngle, endAngle: data.endAngle };
    });

    // Created arc for the pie chart
    this.arc = d3.arc<any, { name: string; value: number }>()
      .startAngle((d: any) => d.startAngle)
      .endAngle((d: any) => d.endAngle)
      .outerRadius(this.radius)
      .innerRadius(0)

    // create the paths to draw the pie chart
    const paths = this.svg.selectAll('path')
      .data(pie(this.data()));


    paths.enter()
      .append('svg:path')
      .attr("stroke", "var(--mat-app-background-color)")
      .attr("stroke-width", 1.5)
      .attr('fill', (d: any, i: number) => this.color(i.toString()))
      .on('mousemove', (event: any, d: any) => this.showTooltip(event, d))
      .on('mouseout', () => this.hideTooltip())
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

  private showTooltip(event: any, d: any) {
    this.tooltip.style("left", (event.offsetX + d.data.name.length) + "px");
    this.tooltip.style("top", (event.offsetY - d.data.name.length) + "px");
    this.tooltip.style("display", "block");
    this.tooltip.html((d.data.name) + ": " + (d.data.value));
  }

  private hideTooltip() {
    this.tooltip.style("display", "none");
  }

  private getChartColors() {
    return d3.scaleOrdinal(d3.schemeTableau10);
  }

  // to create a smooth transition like a clock
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
