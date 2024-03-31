import { BehaviorSubject } from 'rxjs';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';

export class MarvelDB {
  private static instance: MarvelDB;
  private db!: IDBDatabase;
  private objectStoreName = 'superheroes';
  public dbStatus!: IDBOpenDBRequest;
  public dbCreated = new BehaviorSubject<boolean>(false);

  private constructor() {
    this.initDB();
  }

  public getDB(): IDBDatabase {
    return this.db;
  }

  public static getInstance(): MarvelDB {
    if (!MarvelDB.instance) {
      MarvelDB.instance = new MarvelDB();
    }
    return MarvelDB.instance;
  }

  private initDB(): void {
    this.dbStatus = indexedDB.open('marvel-db', 1);

    this.dbStatus.onupgradeneeded = (event: any) => {
      this.db = (event.target as IDBOpenDBRequest).result;
      console.log('🚀 ~ MarvelDB ~ initDB ~ this.db:', this.db)
      this.createObjectStore();
    };

    this.dbStatus.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.dbCreated.next(true);
    };

    this.dbStatus.onerror = (event: any) => {
      console.error('Error opening database', event.target.error);
    };
  }

  public getSuperHeroes(): IDBRequest<MarvelHero[]> {
    const transaction = this.db.transaction('superheroes', 'readonly');
    const store = transaction.objectStore('superheroes');
    return store.get('superheroes');
  }

  public saveSuperHeroes(heroes: MarvelHero[]): void {
    const transaction = this.db.transaction('superheroes', 'readwrite');
    const store = transaction.objectStore('superheroes');
    store.put(heroes, 'superheroes');
  }

  private createObjectStore(): void {
    if (!this.db.objectStoreNames.contains(this.objectStoreName)) {
      this.db.createObjectStore(this.objectStoreName);
    }
  }
}