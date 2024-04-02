import { Pipe, PipeTransform } from '@angular/core';
import { HeroPropertiePipeConfig } from '../../interfaces/hero.interface';

const HERO_CITIZEN_DEFAULT = 'United States of America';

@Pipe({
  name: 'marvelHeroCitizen',
  standalone: true
})
export class MarvelHeroCitizenPipe implements PipeTransform {
  transform(citizen: string = HERO_CITIZEN_DEFAULT): HeroPropertiePipeConfig {
    const citizenshipMap: { [key: string]: HeroPropertiePipeConfig } = {
      'united states of america': {
        label: 'United States of America',
        backgroundColor: '#4CAF50',
        emoji: '🇺🇸'
      },
      'ireland': {
        label: 'Ireland',
        backgroundColor: '#E91E63',
        emoji: '🇮🇪'
      }
    };

    return citizenshipMap[citizen.toLowerCase()] || {
      label: HERO_CITIZEN_DEFAULT,
      backgroundColor: '#9E9E9E',
      emoji: '🌎'
    };
  }

}
