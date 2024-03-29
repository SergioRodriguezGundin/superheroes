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
export class TableComponent {
  superheroes = input<MarvelHero[]>([]);

  displayedColumns = input<string[]>([]);

  selectedRow = output<MarvelHero>();

  dataSource = new MatTableDataSource<MarvelHero>([]);

  clickedRows = new Set<MarvelHero>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  constructor() {
    this.listenToSuperheroes();
  }

  private listenToSuperheroes() {
    effect(() => {
      this.dataSource.data = this.superheroes()
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public selectHero(hero: MarvelHero) {
    this.selectedRow.emit(hero);
  }
}
