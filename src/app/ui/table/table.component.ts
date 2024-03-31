import { ChangeDetectionStrategy, Component, ViewChild, effect, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { BarChartComponent } from '../charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule, BarChartComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent<T> {
  dataTable = input<T[]>([]);

  displayedColumns = input<string[]>([]);

  selectedRow = output<T>();

  rowToUpdate = output<T>();

  rowToDeleted = output<T>();

  dataSource = new MatTableDataSource<T>([]);

  clickedRows = new Set<T>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  // - chart data example
  chartData: { name: string; value: number }[] = [{ name: 'A', value: 10 }, { name: 'B', value: 20 }, { name: 'C', value: 30 }, { name: 'D', value: 40 }, { name: 'E', value: 50 }, { name: 'F', value: 60 }, { name: 'G', value: 70 }, { name: 'H', value: 80 }, { name: 'I', value: 90 }, { name: 'J', value: 100 }];

  constructor() {
    this.listenToDataTable();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public selectRow(row: T) {
    this.selectedRow.emit(row);
  }

  public updateRow(row: T) {
    this.rowToUpdate.emit(row);
  }

  public deleteRow(row: T) {
    this.rowToDeleted.emit(row);
  }

  private listenToDataTable() {
    effect(() => {
      this.dataSource.data = this.dataTable()
    });
  }
}