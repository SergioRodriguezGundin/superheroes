import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { MarvelDB } from '../../core/db/marvel-db';
import { MarvelStoreService } from './store/marvel-store.service';
import { MarvelHero } from './interfaces/hero.interface';
import { SnackBar, SnackbarService } from '../../core/snackbar/snackbar.service';
const MARVEL_HEROES_WIKI_URL = 'assets/data/wikipedia_marvel_data.json';

@Injectable(
  { providedIn: 'root' }
)
export class MarvelService {
  private httpClient = inject(HttpClient);

  private marvelStoreService = inject(MarvelStoreService);

  private snackbarService = inject(SnackbarService);

  // - Expose signals
  heroes = this.marvelStoreService.heroes;

  heroNames = this.marvelStoreService.heroNames;

  heroNamesBackup = this.marvelStoreService.heroNamesBackup;

  heroChartData = this.marvelStoreService.heroesChartData;

  // - db
  private marvelDBInstance: MarvelDB;

  constructor() {
    this.marvelDBInstance = MarvelDB.getInstance();
    this.marvelDBInstance.dbCreated.subscribe((dbCreated) => {
      if (dbCreated) {
        this.getSuperHeroes();
      }
    });
  }

  // - actions
  public getSuperHeroes() {
    this.marvelDBInstance.getSuperHeroes().onsuccess = (event: any) => {
      const heroes = event.target.result;
      if (heroes) {
        this.setSuperHeroes(heroes);
      } else {
        this.httpClient.get<MarvelHero[]>(MARVEL_HEROES_WIKI_URL).subscribe((heroes: MarvelHero[]) => {
          heroes = this.getHeroesWithIds(heroes);
          this.setSuperHeroes(heroes);
          this.marvelDBInstance.saveSuperHeroes(heroes);
        });
      }
    }
  }

  // - actions
  public setSuperHeroes(state: MarvelHero[]) {
    try {
      this.marvelStoreService.addHeroes(state);
      this.snackbarService.showMessage('Heroes loaded', SnackBar.INFO);
    } catch (error) {
      this.snackbarService.showMessage('Failed to load heroes', SnackBar.ERROR);
    }
  }

  public addSuperHero(hero: MarvelHero) {
    try {
      this.marvelStoreService.addHero(hero);
      this.marvelDBInstance.saveSuperHeroes(this.marvelStoreService.heroes());
      this.snackbarService.showMessage('Hero added successfully', SnackBar.SUCCESS);
    } catch (error) {
      this.snackbarService.showMessage('Failed to add hero', SnackBar.ERROR);
    }
  }

  public updateSuperHero(hero: MarvelHero) {
    try {
      this.marvelStoreService.updateHero(hero);
      this.marvelDBInstance.saveSuperHeroes(this.marvelStoreService.heroes());
      this.snackbarService.showMessage('Hero updated successfully', SnackBar.SUCCESS);
    } catch (error) {
      this.snackbarService.showMessage('Failed to update hero', SnackBar.ERROR);
    }
  }

  public removeHero(hero: MarvelHero) {
    try {
      this.marvelStoreService.removeHero(hero.id);
      this.marvelDBInstance.saveSuperHeroes(this.marvelStoreService.heroes());
      this.snackbarService.showMessage('Hero removed successfully', SnackBar.SUCCESS);
    } catch (error) {
      this.snackbarService.showMessage('Failed to remove hero', SnackBar.ERROR);
    }
  }

  public filterHeroesByName(query: string[]) {
    this.marvelStoreService.filterHeroesByNames(query)
  }

  // - utilities functions
  private getHeroesWithIds(heroes: MarvelHero[]) {
    return heroes.map((hero) => ({ ...hero, id: crypto.randomUUID() }));
  }
}