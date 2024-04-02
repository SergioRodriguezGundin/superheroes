import { AccordionComponent } from '../../../../ui/accordion/accordion.component';
import { ChangeDetectionStrategy, Component, WritableSignal, computed, effect, inject, signal } from '@angular/core';
import { DialogInputs } from '../../../../ui/dialog/dialog.component';
import { DialogService } from '../../../../ui/dialog/dialog.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { HeroFormComponent } from '../../components/hero-form/hero-form.component';
import { MarvelHero } from '../../interfaces/hero.interface';
import { MarvelService } from '../../marvel.service';
import { marvelSuperHeroesColumns } from '../../models/marvel.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchComponent } from '../../../../ui/search/search.component';
import { TableComponent } from '../../../../ui/table/table.component';

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

  heroes = this.marvelService.heroes;

  heroNames = this.marvelService.heroNames;

  heroNamesBackup = this.marvelService.heroNamesBackup;

  heroSelected: MarvelHero | null = null;

  displayedColumns: string[] = marvelSuperHeroesColumns;

  openAccordion = false;

  marvelSuperheroesChartsData: { name: string; value: number }[][] = [];

  constructor() {
    effect(() => {
      this.marvelSuperheroesChartsData = this.marvelService.heroChartData();
    });
  }

  public updateHero(hero: MarvelHero) {
    this.heroSelected = hero;
    this.openAccordion = true;
  }

  public createHero() {
    this.heroSelected = null;
    this.openAccordion = !this.openAccordion;
  }

  public selectHero(hero: MarvelHero) {
    this.dialogService.open({
      title: '',
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
    this.marvelService.filterHeroesByName(query);
  }
}
