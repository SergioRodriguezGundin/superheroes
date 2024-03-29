import { Component, ViewChild, effect, input, output } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';


@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent<T> {
  dataTable = input<T[]>([]);

  displayedColumns = input<string[]>([]);

  selectedRow = output<T>();

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

  private listenToDataTable() {
    effect(() => {
      this.dataSource.data = this.dataTable()
    });
  }
}