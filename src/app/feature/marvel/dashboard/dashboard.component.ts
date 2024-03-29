import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent, DialogInputs } from '../../../ui/dialog/dialog.component';
import { HeroComponent } from '../../../ui/hero/hero.component';
import { SearchComponent } from '../../../ui/search/search.component';
import { TableComponent } from '../../../ui/table/table.component';
import { MarvelHero } from '../interfaces/marvel.interface';
import { MarvelService } from '../marvel.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent, TableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  superheroes = inject(MarvelService).superheroes;

  inmutableHeroes = inject(MarvelService).inmutableHeroes;

  superheroesNames = inject(MarvelService).superheroesNames;

  displayedColumns: string[] = ['nameLabel', 'genderLabel', 'occupationLabel', 'skillsLabel', 'creatorLabel', 'citizenshipLabel', 'memberOfLabel'];

  constructor(public dialog: MatDialog) {
    inject(MarvelService).getSuperHeroes();
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
    const dataSource = this.filterDataSourceBySearch(query);
    this.superheroes.set(dataSource)
  }

  private filterDataSourceBySearch(query: string[]): MarvelHero[] {
    if (!query.length) {
      return this.inmutableHeroes();
    }

    return this.inmutableHeroes().filter(hero => query.includes(hero.nameLabel));
  }
}
