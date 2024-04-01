import { Injectable, computed, signal } from '@angular/core';
import { MarvelHero, MarvelHeroType } from '../interfaces/marvel.interface';

export interface MarvelHeroesStore {
  heroes: MarvelHero[];
  loaded: boolean;
  error: string | null;

  heroesBackup: MarvelHero[];
}

@Injectable(
  { providedIn: 'root' }
)
export class MarvelStoreService {
  // state
  private state = signal<MarvelHeroesStore>({
    heroes: [],
    loaded: false,
    error: null,

    heroesBackup: []
  });

  // selectors
  heroes = computed(() => this.state().heroes);
  heroNames = computed(() => this.state().heroes.map(hero => hero.nameLabel));
  loaded = computed(() => this.state().loaded);
  error = computed(() => this.state().error);
  heroesChartData = computed(() => {
    const heroes = this.state().heroes;
    const chartData = this.buildHeroesChartData(heroes);
    return [
      this.getChartDataByProperty('nameLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('genderLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('occupationLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('skillsLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('creatorLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('citizenshipLabel', chartData).sort((a, b) => (b.value - a.value)),
      this.getChartDataByProperty('memberOfLabel', chartData).sort((a, b) => (b.value - a.value)),
    ];
  });
  heroNamesBackup = computed(() => this.state().heroesBackup.map(hero => hero.nameLabel));

  // reducers
  public addHeroes(heroes: MarvelHero[]): void {
    this.state.set({ ...this.state(), heroes, heroesBackup: heroes });
  }

  public addHero(hero: MarvelHero): void {
    hero = { ...hero, id: crypto.randomUUID() };
    this.state.set({ ...this.state(), heroes: [hero, ...this.state().heroes,], heroesBackup: [hero, ...this.state().heroesBackup,] });
  }

  public removeHero(id: string): void {
    const heroes = this.state().heroes.filter(hero => hero.id !== id)
    this.state.set({ ...this.state(), heroes, heroesBackup: heroes });
  }

  public updateHero(hero: MarvelHero): void {
    const heroes = this.state().heroes.map(_hero => _hero.id === hero.id ? hero : _hero);
    this.state.set({ ...this.state(), heroes, heroesBackup: heroes });
  }

  public filterHeroesByNames(query: string[]) {
    if (query.length) {
      const heroes = this.state().heroesBackup.filter(hero => query.includes(hero.nameLabel.toLowerCase()) || query.includes(hero.nameLabel));
      this.state.set({ ...this.state(), heroes });
    } else {
      this.state.set({ ...this.state(), heroes: this.state().heroesBackup });
    }
  }

  private getChartDataByProperty(property: MarvelHeroType, chartData: { [key in MarvelHeroType]: { [key: string]: number } }) {
    return Object.keys(chartData[property]).map((key) => ({ name: key, value: chartData[property][key] }));
  }

  private buildHeroesChartData(heroes: MarvelHero[]) {
    let superHeroLabel: { [key in MarvelHeroType]: { [key: string]: number } } = {
      id: {},
      nameLabel: {},
      citizenshipLabel: {},
      creatorLabel: {},
      genderLabel: {},
      memberOfLabel: {},
      occupationLabel: {},
      skillsLabel: {},
    };


    heroes.forEach(hero => {
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
  }
}