import { MarvelHeroCreatorPipe } from './marvel-hero-creator.pipe';

describe('MarvelHeroCreatorPipe', () => {
  it('create an instance', () => {
    const pipe = new MarvelHeroCreatorPipe();
    expect(pipe).toBeTruthy();
  });
});
