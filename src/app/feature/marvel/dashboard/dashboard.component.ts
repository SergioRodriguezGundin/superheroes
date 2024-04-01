import { ChangeDetectionStrategy, Component, WritableSignal, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AccordionComponent } from '../../../ui/accordion/accordion.component';
import { DialogInputs } from '../../../ui/dialog/dialog.component';
import { DialogService } from '../../../ui/dialog/dialog.service';
import { HeroComponent } from '../../../ui/hero/hero.component';
import { SearchComponent } from '../../../ui/search/search.component';
import { TableComponent } from '../../../ui/table/table.component';
import { HeroFormComponent } from '../hero-form/hero-form.component';
import { MarvelHero } from '../interfaces/marvel.interface';
import { MarvelService } from '../marvel.service';
import { marvelSuperHeroesColumns } from '../models/marvel.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SearchComponent, TableComponent, MatIcon, MatButtonModule, MatMenuModule, AccordionComponent, HeroFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private dialogService = inject(DialogService);

  private marvelService = inject(MarvelService);

  superheroes = this.marvelService.superheroes;

  inmutableHeroes = this.marvelService.inmutableHeroes;

  superheroesNames = this.marvelService.superheroesNames;

  inmutableHeroesNames = this.marvelService.inmutableHeroesNames;

  heroSelected: MarvelHero | null = null;

  displayedColumns: string[] = marvelSuperHeroesColumns;

  openAccordion = false;

  marvelSuperheroesChartsData = computed(() => {
    return [
      this.marvelService.nameLabelData(),
      this.marvelService.genderData().sort((a, b) => (b.value - a.value)).slice(0, 8),
      this.marvelService.occupationData().sort((a, b) => (b.value - a.value)).slice(0, 8),
      this.marvelService.skillsData().sort((a, b) => (b.value - a.value)).slice(0, 8),
      this.marvelService.creatorData().sort((a, b) => (b.value - a.value)).slice(0, 8),
      this.marvelService.citizensShipData().sort((a, b) => (b.value - a.value)).slice(0, 8),
      this.marvelService.memberOfData().sort((a, b) => (b.value - a.value)).slice(0, 8),
    ]
  })

  public updateHero(hero: MarvelHero) {
    this.heroSelected = hero;
    this.openAccordion = true;
  }

  public createHero() {
    this.heroSelected = null;
    this.openAccordion = true;
  }

  public selectHero(hero: MarvelHero) {
    this.dialogService.open({
      title: 'Hero Details',
      content: {
        component: HeroComponent,
        inputs: { hero },
      },
      actions: null,
    } as DialogInputs);
  }

  public removeHero(hero: MarvelHero) {
    this.marvelService.removeHero(hero);
  }

  public storeNewHero(hero: MarvelHero) {
    this.marvelService.addSuperHero(hero);
    this.openAccordion = false;
  }

  public storeUpdatedHero(hero: MarvelHero) {
    this.marvelService.updateSuperHero(hero);
    this.openAccordion = false;
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
