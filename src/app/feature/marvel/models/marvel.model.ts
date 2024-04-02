import { MarvelHeroType } from '../interfaces/hero.interface';

export const marvelSuperHeroesColumns: MarvelHeroType[] = ['nameLabel', 'genderLabel', 'occupationLabel', 'skillsLabel', 'creatorLabel', 'citizenshipLabel', 'memberOfLabel'];

export const marvelSuperHeroLabels: { [key in MarvelHeroType]: { [key: string]: number } } = {
  id: {},
  nameLabel: {},
  citizenshipLabel: {},
  creatorLabel: {},
  genderLabel: {},
  memberOfLabel: {},
  occupationLabel: {},
  skillsLabel: {},
}