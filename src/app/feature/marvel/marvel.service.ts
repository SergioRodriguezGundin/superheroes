import { HttpClient } from '@angular/common/http';
import { Injectable, WritableSignal, computed, inject, signal } from '@angular/core';
import { MarvelHero, MarvelHeroType } from './interfaces/marvel.interface';
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

  superHeroesNamesPersisted: WritableSignal<string[]> = signal([]);

  // - Marvel heroes chart data

  superHeroesChartData = computed(() => {
    const superheroes = this.superheroes();
    const superHeroLabel: { [key in MarvelHeroType]: { [key: string]: number } } = {
      id: {},
      nameLabel: {},
      citizenshipLabel: {},
      creatorLabel: {},
      genderLabel: {},
      memberOfLabel: {},
      occupationLabel: {},
      skillsLabel: {},
    };

    superheroes.forEach(hero => {
      Object.keys(hero).forEach((key) => {
        if (!superHeroLabel[key as MarvelHeroType]) {
          superHeroLabel[key as MarvelHeroType] = {};
        }

        if (!superHeroLabel[key as MarvelHeroType][hero[key as MarvelHeroType]]) {
          superHeroLabel[key as MarvelHeroType][hero[key as MarvelHeroType]] = 0;
        }
        superHeroLabel[key as MarvelHeroType][hero[key as MarvelHeroType]]++;
      });
    });

    return superHeroLabel;
  });

  private getChartData(label: MarvelHeroType) {
    const heroesChartData = this.superHeroesChartData();
    return Object.keys(heroesChartData[label]).map((key) => ({ name: key, value: heroesChartData[label][key] }));
  }

  nameLabelData = computed(() => this.getChartData('nameLabel'));

  citizensShipData = computed(() => this.getChartData('citizenshipLabel'));

  genderData = computed(() => this.getChartData('genderLabel'));

  occupationData = computed(() => this.getChartData('occupationLabel'));

  skillsData = computed(() => this.getChartData('skillsLabel'));

  creatorData = computed(() => this.getChartData('creatorLabel'));

  memberOfData = computed(() => this.getChartData('memberOfLabel'));


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

    this.superHeroesNamesPersisted.set(this.superheroes().map(hero => hero.nameLabel));

    // - save in db
    this.marvelDBInstance.saveSuperHeroes(this.superheroes());
  }

  public updateSuperHero(hero: MarvelHero) {
    this.superheroes.update((heroes) => {
      return heroes.map((_hero) => (_hero.id === hero.id ? hero : _hero));
    });

    this.superHeroesNamesPersisted.set(this.superheroes().map(hero => hero.nameLabel));

    // - save in db
    this.marvelDBInstance.saveSuperHeroes(this.superheroes());
  }

  public removeHero(hero: MarvelHero) {
    this.superheroes.update((heroes) => {
      return heroes.filter((_hero) => _hero.id !== hero.id);
    });

    this.superHeroesNamesPersisted.set(this.superheroes().map(hero => hero.nameLabel));

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
    this.superHeroesNamesPersisted.set(state.map(hero => hero.nameLabel));
  }
}