import { ElementRef } from '@angular/core';

export type Chart = 'bar' | 'pie';

export interface ChartData { name: string; value: number }

export interface ChartConfig {
  type: Chart;
  chartId: string;
  width: number;
  height: number;
  margin: { top: number; right: number; bottom: number; left: number };
  colors?: string[];
}

export interface ChartInstance {
  svg: any;
  tooltip: any;
  x: any;
  y: any;
}

export interface ChartFactory {
  createChart(element: ElementRef, chartConfiguration: ChartConfig): ChartInstance;
  updateChart(data: ChartData[], instance: ChartInstance): void;
  showTooltip(event: any, data: ChartData, instance: ChartInstance): void;
  hideTooltip(instance: ChartInstance): void;
}