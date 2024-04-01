import { MarvelHeroType } from '../interfaces/marvel.interface';

export const marvelSuperHeroesColumns = ['nameLabel', 'genderLabel', 'occupationLabel', 'skillsLabel', 'creatorLabel', 'citizenshipLabel', 'memberOfLabel'];

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