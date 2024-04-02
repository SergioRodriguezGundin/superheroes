import { Pipe, PipeTransform } from '@angular/core';
import { HeroPropertiePipeConfig } from '../../interfaces/hero.interface';

export const HERO_GENDER_DEFAULT = 'male';

@Pipe({
  name: 'marvelHeroGenderPipe',
  standalone: true
})
export class MarvelHeroGenderPipe implements PipeTransform {
  transform(gender: string = HERO_GENDER_DEFAULT): HeroPropertiePipeConfig {
    const genderConfig: { [key: string]: HeroPropertiePipeConfig } = {
      'male': {
        label: 'male',
        backgroundColor: '#4240c7',
        emoji: '♂️'
      },
      'female': {
        label: 'female',
        backgroundColor: '#E91E63',
        emoji: '♀️'
      }
    };

    return genderConfig[gender.toLowerCase()] || {
      label: HERO_GENDER_DEFAULT,
      backgroundColor: '#9E9E9E',
      emoji: '❓'
    };
  }
}
