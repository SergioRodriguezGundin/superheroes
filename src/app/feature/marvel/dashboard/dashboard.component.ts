import { ChangeDetectionStrategy, Component, ViewChild, computed, effect, inject } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MarvelService } from '../marvel.service';
import { MarvelHero } from '../interfaces/marvel.interface';

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

  @ViewChild(MatPaginator) paginator: MatPaginator = {} as MatPaginator;

  sortedHero: MarvelHero[] = [];

  constructor() {
    inject(MarvelService).getSuperHeroes();

    effect(() => {
      this.sortedHero = this.superheroes();
    });
  }

  sortData(sort: Sort) {
    const data = this.superheroes().slice();

    if (!sort.active || sort.direction === '') {
      this.sortedHero = data;
    } else {
      this.sortedHero = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
}
