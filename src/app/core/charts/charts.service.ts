import { ElementRef, Injectable } from '@angular/core';
import { Chart, ChartConfig, ChartData, ChartFactory, ChartInstance } from './charts.interface';
import { BarChart } from './chart-types/bar-chart';
import { PieChart } from './chart-types/pie-chart';

@Injectable(
  { providedIn: 'root' }
)
export class ChartService {
  private charts: { [key in Chart]: ChartFactory } = {
    'bar': new BarChart(),
    'pie': new PieChart(),
  };

  private chartFactory: { [id: string]: ChartFactory } = {};
  private chartInstances: { [id: string]: ChartInstance } = {};

  getChartFactory(chartType: Chart): ChartFactory {
    return this.charts[chartType];
  }

  createChart(id: string, element: ElementRef, data: ChartData[], chartConfiguration: ChartConfig) {
    this.chartFactory[id] = this.getChartFactory(chartConfiguration.type);
    this.chartInstances[id] = this.chartFactory[id].createChart(element, chartConfiguration);
    this.chartFactory[id].updateChart(data, this.chartInstances[id])
  }

  updateChart(id: string, data: ChartData[]) {
    if (this.chartFactory[id]) {
      console.log('🚀 ~ ChartService ~ updateChart ~ this.chartFactory[id].instance:', this.chartInstances[id])
      this.chartFactory[id].updateChart(data, this.chartInstances[id]);
    } else {
      console.error(`Chart with id ${id} not found.`);
    }
  }
}