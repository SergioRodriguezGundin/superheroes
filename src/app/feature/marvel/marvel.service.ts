import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, effect, inject, signal } from '@angular/core';
import { MarvelHero } from './interfaces/marvel.interface';

const MARVEL_HEROES_WIKI_URL = 'assets/data/wikipedia_marvel_data.json';

@Injectable(
  { providedIn: 'root' }
)
export class MarvelService {
  private httpClient = inject(HttpClient);

  superheroes: WritableSignal<MarvelHero[]> = signal([]);

  superheroesNames: WritableSignal<string[]> = signal([]);

  inmutableHeroes: WritableSignal<MarvelHero[]> = signal([]);

  // - db
  private dbName = 'marvel-db';
  private db!: IDBDatabase;

  constructor() {
    const request = indexedDB.open(this.dbName, 1);

    request.onupgradeneeded = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      this.db.createObjectStore('superheroes');
    };

    request.onsuccess = (event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('Database opened', this.db);
      this.getSuperHeroes();
    };

    request.onerror = (event) => {
      console.log('Database error: ' + (event.target as IDBOpenDBRequest).error);
    };
  }

  // - actions
  public addSuperHero(hero: MarvelHero) {
    this.updateSuperHeroesStore([hero, ...this.superheroes()]);
    this.saveSuperHeros();
  }

  public removeHero(hero: MarvelHero) {
    const heroes = this.superheroes().filter(h => h.nameLabel !== hero.nameLabel);
    this.updateSuperHeroesStore(heroes);
    this.saveSuperHeros();
  }

  // - other methods
  private setSuperheroesNames(heroes: MarvelHero[]) {
    this.superheroesNames.set(heroes.map(hero => hero.nameLabel));
  }

  // - store
  private updateSuperHeroesStore(state: MarvelHero[]) {
    this.superheroes.set(state);
    this.inmutableHeroes.set(state);
    this.setSuperheroesNames(this.superheroes());
  }

  // - db
  public getSuperHeroes() {
    const transaction = this.db.transaction('superheroes', 'readonly');
    const store = transaction.objectStore('superheroes');
    const request = store.get('superheroes');

    request.onsuccess = (event) => {
      const heroes = (event.target as IDBRequest).result as MarvelHero[];

      if (heroes) {
        this.updateSuperHeroesStore(heroes)
      } else {
        this.httpClient.get<MarvelHero[]>(MARVEL_HEROES_WIKI_URL).subscribe((heroes: MarvelHero[]) => {
          this.updateSuperHeroesStore(heroes);
          this.saveSuperHeros();
        });
      }
    };

    request.onerror = (event) => {
      console.log('Database error: ' + (event.target as IDBRequest).error);
    };
  }

  private saveSuperHeros() {
    const transaction = this.db.transaction('superheroes', 'readwrite');
    const store = transaction.objectStore('superheroes');
    store.put(this.superheroes(), 'superheroes');
  }
}