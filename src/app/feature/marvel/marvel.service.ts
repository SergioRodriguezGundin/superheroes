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

  public getSuperHeroes() {
    this.httpClient.get<MarvelHero[]>(MARVEL_HEROES_WIKI_URL).subscribe((heroes: MarvelHero[]) => {
      this.superheroes.set(heroes);
      this.inmutableHeroes.set(heroes)
      this.setSuperheroesNames(heroes);
    });
  }

  public addSuperHero(hero: MarvelHero) {
    this.superheroes.set([hero, ...this.superheroes()]);
    this.inmutableHeroes.set([hero, ...this.inmutableHeroes()]);
    this.setSuperheroesNames(this.superheroes());
  }

  private setSuperheroesNames(heroes: MarvelHero[]) {
    this.superheroesNames.set(heroes.map(hero => hero.nameLabel));
  }
}