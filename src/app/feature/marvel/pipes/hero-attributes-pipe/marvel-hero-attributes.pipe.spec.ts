import { HeroAttributePipe } from './marvel-hero-attributes.pipe';

describe('HeroAttributePipe', () => {
  it('create an instance', () => {
    const pipe = new HeroAttributePipe();
    expect(pipe).toBeTruthy();
  });
});
