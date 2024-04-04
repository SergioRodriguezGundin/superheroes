import { CommonModule } from '@angular/common';
import { Component, ViewChild, effect, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ColumnMetricsComponent } from '../../../../ui/table/column-metrics/column-metrics.component';
import { MarvelHero } from '../../interfaces/hero.interface';
import { TableComponent } from '../../../../ui/table/table.component';

@Component({
  selector: 'app-super-heroes-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, ColumnMetricsComponent],
  templateUrl: './super-heroes-table.component.html',
  styleUrl: './super-heroes-table.component.scss'
})
export class SuperHeroesTableComponent extends TableComponent<MarvelHero> {
  displayedColumns = input<string[]>([]);

  enabledCharts = input<boolean>(true);

  chartData = input<{ name: string; value: number }[][]>([]);

  dataSource = new MatTableDataSource<MarvelHero>([]);

  clickedRows = new Set<MarvelHero>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor() {
    super();
    this.listenToDataTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private listenToDataTable() {
    effect(() => {
      this.dataSource.data = this.dataTable()
    });
  }

}
