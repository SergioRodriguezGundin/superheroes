import { ChangeDetectionStrategy, Component, ViewChild, effect, inject, signal } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MarvelHero } from '../interfaces/marvel.interface';
import { MarvelService } from '../marvel.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogInputs } from '../../../ui/dialog/dialog.component';
import { HeroComponent } from '../../../ui/hero/hero.component';
import { SearchComponent } from '../../../ui/search/search.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, SearchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  superheroes = inject(MarvelService).superheroes;

  superheroesNames = inject(MarvelService).superheroesNames;

  displayedColumns: string[] = ['nameLabel', 'genderLabel', 'occupationLabel', 'skillsLabel', 'creatorLabel', 'citizenshipLabel', 'memberOfLabel'];

  dataSource = new MatTableDataSource<MarvelHero>([]);

  clickedRows = new Set<MarvelHero>();

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  @ViewChild(MatSort) sort: MatSort = {} as MatSort;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  constructor(public dialog: MatDialog) {
    inject(MarvelService).getSuperHeroes();
    this.listenToSuperheroes();
  }

  public selectHero(hero: MarvelHero) {
    this.dialog.open(DialogComponent, {
      data: {
        title: 'Hero Details',
        content: {
          component: HeroComponent,
          inputs: { hero },
        },
        actions: null,
      } as DialogInputs,
    })
  }

  public applySearch(query: string[]) {
    this.dataSource.data = this.filterDataSourceBySearch(query);
  }

  private filterDataSourceBySearch(query: string[]): MarvelHero[] {
    if (!query.length) {
      return this.superheroes();
    }

    return this.superheroes().filter(hero => query.includes(hero.nameLabel));
  }

  private listenToSuperheroes() {
    effect(() => {
      this.dataSource.data = this.superheroes()
    });
  }
}
