import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { MarvelHero } from './interfaces/marvel.interface';
import { MarvelDB } from '../../core/db/marvel-db';
const MARVEL_HEROES_WIKI_URL = 'assets/data/wikipedia_marvel_data.json';

@Injectable(
  { providedIn: 'root' }
)
export class MarvelService {
  private httpClient = inject(HttpClient);

  superheroes: WritableSignal<MarvelHero[]> = signal([]);

  inmutableHeroes: WritableSignal<MarvelHero[]> = signal([]);

  superheroesNames = computed(() => this.superheroes().map(hero => hero.nameLabel));

  superheroesCitizends = computed(() => this.superheroes().map(hero => hero.citizenshipLabel));

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
        this.initSuperHeroesStore(heroes);
      } else {
        this.httpClient.get<MarvelHero[]>(MARVEL_HEROES_WIKI_URL).subscribe((heroes: MarvelHero[]) => {
          heroes = this.getHeroesWithIds(heroes);
          this.initSuperHeroesStore(heroes);
          this.marvelDBInstance.saveSuperHeroes(this.superheroes());
        });
      }
    }
  }

  public addSuperHero(hero: MarvelHero) {
    hero = { ...hero, id: crypto.randomUUID() };
    this.superheroes.update((heroes) => [hero, ...heroes]);

    // - save in db
    this.marvelDBInstance.saveSuperHeroes(this.superheroes());
  }

  public updateSuperHero(hero: MarvelHero) {
    this.superheroes.update((heroes) => {
      return heroes.map((_hero) => (_hero.id === hero.id ? hero : _hero));
    });

    // - save in db
    this.marvelDBInstance.saveSuperHeroes(this.superheroes());
  }

  public removeHero(hero: MarvelHero) {

    this.superheroes.update((heroes) => {
      return heroes.filter((_hero) => _hero.id !== hero.id);
    });

    // - save in db
    this.marvelDBInstance.saveSuperHeroes(this.superheroes());
  }

  private getHeroesWithIds(heroes: MarvelHero[]) {
    return heroes.map((hero) => ({ ...hero, id: crypto.randomUUID() }));
  }

  // - init store signals()
  private initSuperHeroesStore(state: MarvelHero[]) {
    this.superheroes.set(state);
    this.inmutableHeroes.set(state);
  }
}