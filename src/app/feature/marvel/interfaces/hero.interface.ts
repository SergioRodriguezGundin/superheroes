export enum Gender {
  Male = 'male',
  Female = 'female',
}
export type GenderType = keyof typeof Gender;

export enum Citizenship {
  UnitedStatesOfAmerica = 'United States of America',
  Ireland = 'Ireland',
  Wakanda = 'Wakanda',
  Canada = 'Canada',
  PrincipalityOfWallachia = 'Principality of Wallachia',
  UnitedKingdom = 'United Kingdom',
  Russia = 'Russia',
  Egypt = 'Egypt',
}
export type CitizenshipType = keyof typeof Citizenship;

export enum Skill {
  SuperhumanStrength = 'superhuman strength',
  SonicScream = 'sonic scream',
  Precognition = 'precognition',
  HealingFactor = 'healing factor',
  SuperhumanAgilityReflexes = 'superhuman agility / reflexes',
  Telepathy = 'telepathy',
  EnergyBlasts = 'energy blasts',
  Shapeshifting = 'shapeshifting',
  Photokinesis = 'photokinesis',
  WeatherManipulation = 'weather manipulation',
  Levitation = 'levitation',
  Retrocognition = 'retrocognition',
  TeleportationInFiction = 'teleportation in fiction',
}
export type SkillType = keyof typeof Skill;

export enum Occupation {
  Psychologist = 'psychologist',
  Student = 'student',
  Criminal = 'criminal',
  Scientist = 'scientist',
  Writer = 'writer',
  Superhero = 'superhero',
  Soldier = 'soldier',
  Teacher = 'teacher',
  FictionalSoldier = 'fictional soldier',
  Sovereign = 'sovereign',
  Businessperson = 'businessperson',
  CircusPerformer = 'circus performer',
  Leader = 'leader',
  Reporter = 'reporter',
  Actor = 'actor',
  Mercenary = 'mercenary',
  DomesticWorker = 'domestic worker',
  Physician = 'physician',
  Gangster = 'gangster',
  Astronaut = 'astronaut',
}
export type OccupationType = keyof typeof Occupation;

export enum MemberOf {
  HorsemenOfApocalypse = 'Horsemen of Apocalypse',
  TheSpiderSociety = 'The Spider Society',
  Interpol = 'Interpol',
  NewWarriors = 'New Warriors',
  Defenders = 'Defenders',
  TheAvengers = 'The Avengers',
  BrotherhoodOfMutants = 'Brotherhood of Mutants',
  UnitedStatesArmy = 'United States Army',
  Illuminati = 'Illuminati',
  HellfireClub = 'Hellfire Club',
  XMen = 'X-Men',
  OrderOfTheDragon = 'Order of the Dragon',
  Alchemax = 'Alchemax',
  Avengers = 'Avengers',
  Purifiers = 'Purifiers',
  SHIELD = 'S.H.I.E.L.D.',
  XForce = 'X-Force',
  CanadianArmy = 'Canadian Army',
  Maggia = 'Maggia',
  AlphaFlight = 'Alpha Flight',
  ClanAkkaba = 'Clan Akkaba',
  TheFantasticFour = 'The Fantastic Four',
  UniversityOfCambridge = 'University of Cambridge',
  Oscorp = 'Oscorp',
  DarkAvengers = 'Dark Avengers',
  KGB = 'KGB',
}
export type MemberOfType = keyof typeof MemberOf;

export interface MarvelHero {
  id: string;
  nameLabel: string;
  genderLabel: Gender;
  citizenshipLabel: Citizenship;
  skillsLabel: Skill;
  occupationLabel: Occupation;
  memberOfLabel: MemberOf;
  creatorLabel: string;
}

export type MarvelHeroType = keyof MarvelHero;

export type HeroAttributeType = string | Citizenship | Gender | Skill | Occupation | MemberOf;

export interface HeroPropertiePipeConfig {
  label: string;
  backgroundColor: string;
  emoji: string;
}