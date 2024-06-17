import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Citizenship, Gender, MarvelHero, MemberOf, Occupation, Skill } from './interfaces/hero.interface';
import { MarvelService } from './marvel.service';
import { MarvelStoreService } from './store/marvel-store.service';
import { SnackbarService } from '../../core/snackbar/snackbar.service';

describe('MarvelService', () => {
  let service: MarvelService;
  let httpMock: HttpTestingController;
  let mockMarvelStoreService: Partial<MarvelStoreService>;
  let mockSnackbarService: Partial<SnackbarService>;

  let marvelHero = {
    id: 'id_test_hero',
    nameLabel: 'Test Hero',
    citizenshipLabel: Citizenship.UnitedStatesOfAmerica,
    occupationLabel: Occupation.Reporter,
    creatorLabel: 'Stan Lee',
    genderLabel: Gender.Male,
    memberOfLabel: MemberOf.Avengers,
    skillsLabel: Skill.EnergyBlasts,
  }

  beforeEach(() => {
    mockMarvelStoreService = {
      addHeroes: jest.fn(),
    };
    mockSnackbarService = {
      showMessage: jest.fn(),
    };


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        MarvelService,
        { provide: MarvelStoreService, useValue: mockMarvelStoreService },
        { provide: SnackbarService, useValue: mockSnackbarService },
      ]
    });

    service = TestBed.inject(MarvelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('test_getSuperHeroes_from_database', () => {
    // Mock the database call to return superheroes
    const mockHeroes: MarvelHero[] = [{ id: '1', nameLabel: 'Spider-Man' } as MarvelHero];
    service['marvelDBInstance'].getSuperHeroes = jest.fn().mockReturnValue({
      onsuccess: function () {
        this.result = mockHeroes;
      }
    });

    service.getSuperHeroes();
    expect(mockMarvelStoreService.addHeroes).toHaveBeenCalledWith(mockHeroes);
  });

  it('test_getSuperHeroes_from_API', () => {
    // Mock the database call to return undefined
    service['marvelDBInstance'].getSuperHeroes = jest.fn().mockReturnValue({
      onsuccess: function () {
        this.result = undefined;
      }
    });

    const mockHeroes: MarvelHero[] = [{ id: '2', nameLabel: 'Iron Man' } as MarvelHero];
    service.getSuperHeroes();

    const req = httpMock.expectOne(service['MARVEL_HEROES_WIKI_URL']);
    req.flush(mockHeroes);

    expect(mockMarvelStoreService.addHeroes).toHaveBeenCalledWith(expect.any(Array));
  });

  it('test_getSuperHeroes_no_data_returned', () => {
    // Mock the database call to return undefined and API to return empty array
    service['marvelDBInstance'].getSuperHeroes = jest.fn().mockReturnValue({
      onsuccess: function () {
        this.result = undefined;
      }
    });

    service.getSuperHeroes();

    const req = httpMock.expectOne(service['MARVEL_HEROES_WIKI_URL']);
    req.flush([]);

    expect(mockMarvelStoreService.addHeroes).not.toHaveBeenCalled();
    expect(mockSnackbarService.showMessage).toHaveBeenCalledWith('Failed to load heroes', expect.anything());
  });

  it('It should be create a new Marvel Hero', () => {
    const hero: MarvelHero = marvelHero;
    service.addSuperHero(hero);
    expect(service.heroes().some(_heroe => _heroe.id === hero.id)).toBe(true);
  });

  it('It should be update a selected Marvel Hero', () => {
    const hero: MarvelHero = marvelHero;
    service.addSuperHero(hero);
    hero.nameLabel = 'Updated Name';
    service.updateSuperHero(hero);
    expect(service.heroes().find(_heroe => _heroe.id === hero.id)?.nameLabel).toEqual('Updated Name');
  });

  it('It should be remove a selected Marvel Hero', () => {
    const hero: MarvelHero = marvelHero;
    service.addSuperHero(hero);
    service.removeHero(hero);
    expect(service.heroes().some(_heroe => _heroe.id === hero.id)).toBe(false);
  });
});