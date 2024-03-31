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
    hero = { ...hero, id: crypto.randomUUID() };
    this.superheroes.update((heroes) => [...heroes, hero]);

    // - save in db
    this.saveSuperHeros();
  }

  public updateSuperHero(hero: MarvelHero) {
    this.superheroes.update((heroes) => {
      return heroes.map((_hero) => (_hero.id === hero.id ? hero : _hero));
    });

    // - save in db
    this.saveSuperHeros();
  }

  public removeHero(hero: MarvelHero) {

    this.superheroes.update((heroes) => {
      return heroes.filter((_hero) => _hero.id !== hero.id);
    });

    // - save in db
    this.saveSuperHeros();
  }

  // - other methods
  private setSuperheroesNames(heroes: MarvelHero[]) {
    this.superheroesNames.set(heroes.map(hero => hero.nameLabel));
  }

  private getHeroesWithIds(heroes: MarvelHero[]) {
    return heroes.map((hero) => ({ ...hero, id: crypto.randomUUID() }));
  }

  // - init store signals()
  private initSuperHeroesStore(state: MarvelHero[]) {
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
        this.initSuperHeroesStore(heroes)
      } else {
        this.httpClient.get<MarvelHero[]>(MARVEL_HEROES_WIKI_URL).subscribe((heroes: MarvelHero[]) => {
          heroes = this.getHeroesWithIds(heroes);
          this.initSuperHeroesStore(heroes);
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