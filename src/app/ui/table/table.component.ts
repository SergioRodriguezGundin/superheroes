import { ChangeDetectionStrategy, Component, ViewChild, effect, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButtonModule, MatIconModule],
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