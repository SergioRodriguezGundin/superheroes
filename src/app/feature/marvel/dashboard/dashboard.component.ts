import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { AccordionComponent } from '../../../ui/accordion/accordion.component';
import { DialogComponent, DialogInputs } from '../../../ui/dialog/dialog.component';
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
  private dialog = inject(MatDialog);

  private marvelService = inject(MarvelService);

  superheroes = this.marvelService.superheroes;

  inmutableHeroes = this.marvelService.inmutableHeroes;

  superheroesNames = this.marvelService.superheroesNames;

  displayedColumns: string[] = marvelSuperHeroesColumns;

  openAccordion = false;


  public addHeroFromDialog() {
    this.openAccordion = false;
    const heroFormDialogRef = this.dialog.open(HeroFormComponent, {
      width: '700px',
      height: '600px',
    });

    heroFormDialogRef.componentInstance.heroSubmitted.subscribe((hero: MarvelHero) => {
      this.storeNewHero(hero);
      heroFormDialogRef.close();
    });
  }

  public addHeroFromAccordion() {
    this.openAccordion = !this.openAccordion;
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

  public updateHero(hero: MarvelHero) {
    //this.dialog.open(HeroFormComponent, {
    //  data: hero,
    //  width: '700px',
    //  height: '600px',
    //});
  }

  public removeHero(hero: MarvelHero) {
    this.marvelService.removeHero(hero);
  }

  public applySearch(query: string[]) {
    const dataSource = this.filterDataSourceBySearch(query);
    this.superheroes.set(dataSource)
  }

  public storeNewHero(hero: MarvelHero) {
    this.marvelService.addSuperHero(hero);
  }

  private filterDataSourceBySearch(query: string[]): MarvelHero[] {
    if (!query.length) {
      return this.inmutableHeroes();
    }

    return this.inmutableHeroes().filter(hero => query.includes(hero.nameLabel));
  }
}
