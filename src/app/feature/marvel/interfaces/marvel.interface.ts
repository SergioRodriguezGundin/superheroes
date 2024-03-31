export enum MarvelHeroGender {
  female,
  male,
}
type MarvelHeroGenderType = keyof typeof MarvelHeroGender;

export enum MarvelHeroOccupation {
  'circus performer',
  'domestic worker',
  'fictional soldier',
  actor,
  astronaut,
  businessperson,
  criminal,
  gangster,
  leader,
  mercenary,
  physician,
  psychologist,
  reporter,
  sailor,
  scientist,
  soldier,
  sovereign,
  student,
  superhero,
  teacher,
  terrorist,
  writer,
}
type MarvelHeroOccupationType = keyof typeof MarvelHeroOccupation;

export enum Countries {
  'Principality of Wallachia',
  'United Kingdom',
  'United States of America',
  "Shi'ar",
  Canada,
  Egypt,
  Ireland,
  Russia,
  Wakanda,
}
type CountriesType = keyof typeof Countries;

export enum MarvelHeroSkills {
  'energy blasts',
  'healing factor',
  'sonic scream',
  'superhuman agility / reflexes',
  'superhuman strength',
  'teleportation in fiction',
  'weather manipulation',
  levitation,
  photokinesis,
  precognition,
  retrocognition,
  shapeshifting,
  telepathy,
}
type MarvelHeroSkillsType = keyof typeof MarvelHeroSkills;

//export interface MarvelHero {
//  citizenshipLabel: CountriesType;
//  creatorLabel: string;
//  genderLabel: MarvelHeroGenderType;
//  memberOfLabel: string;
//  nameLabel: string;
//  occupationLabel: MarvelHeroOccupationType;
//  skillsLabel: MarvelHeroSkillsType;
//}

export interface MarvelHero {
  id: string;
  citizenshipLabel: CountriesType;
  creatorLabel: string;
  genderLabel: MarvelHeroGenderType;
  memberOfLabel: string;
  nameLabel: string;
  occupationLabel: string;
  skillsLabel: string;
}