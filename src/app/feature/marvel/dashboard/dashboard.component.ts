import { ChangeDetectionStrategy, Component, ViewChild, effect, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MarvelHero } from '../interfaces/marvel.interface';
import { MarvelService } from '../marvel.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  public superheroes = inject(MarvelService).superheroes;

  displayedColumns: string[] = ['nameLabel', 'genderLabel', 'occupationLabel', 'skillsLabel', 'creatorLabel', 'citizenshipLabel', 'memberOfLabel'];

  dataSource = new MatTableDataSource<MarvelHero>([]);

  clickedRows = new Set<MarvelHero>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor() {
    inject(MarvelService).getSuperHeroes();
    this.listenToSuperheroes();
  }

  public selectHero(hero: MarvelHero) {
    console.log('🚀 ~ DashboardComponent ~ selectHero ~ hero:', hero)
  }

  private listenToSuperheroes() {
    effect(() => {
      this.dataSource.data = this.superheroes()
    });
  }
}
