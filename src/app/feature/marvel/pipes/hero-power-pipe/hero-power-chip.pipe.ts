import { Pipe, PipeTransform } from '@angular/core';
import { HeroPropertiePipeConfig } from '../../interfaces/hero.interface';

export const HERO_DEFAULT_POWER = 'Unknown Power';

@Pipe({
  name: 'heroPowerChipPipe',
  standalone: true,
})
export class MarvelHeroPowerChipPipe implements PipeTransform {
  transform(power: string = HERO_DEFAULT_POWER): HeroPropertiePipeConfig {
    const powerConfig: { [key: string]: HeroPropertiePipeConfig } = {
      'energy blasts': {
        label: 'Energy Blasts',
        backgroundColor: '#F44336',
        emoji: '💥'
      },
      'healing factor': {
        label: 'Healing Factor',
        backgroundColor: '#2196F3',
        emoji: '🩹'
      },
      'sonic scream': {
        label: 'Sonic Scream',
        backgroundColor: '#E91E63',
        emoji: '🔊'
      },
      'superhuman agility / reflexes': {
        label: 'Superhuman Agility',
        backgroundColor: '#FF9800',
        emoji: '🤸‍♂️'
      },
      'superhuman strength': {
        label: 'Superhuman Strength',
        backgroundColor: '#4CAF50',
        emoji: '💪'
      },
      'precognition': {
        label: 'Precognition',
        backgroundColor: '#9C27B0',
        emoji: '🔮'
      },
      'shapeshifting': {
        label: 'Shapeshifting',
        backgroundColor: '#607D8B',
        emoji: '🐯'
      },
      'telepathy': {
        label: 'Telepathy',
        backgroundColor: '#673AB7',
        emoji: '🧠'
      },
      'photokinesis': {
        label: 'Photokinesis',
        backgroundColor: '#FFEB3B',
        emoji: '✨'
      },
      'weather manipulation': {
        label: 'weather manipulation',
        backgroundColor: '#2251d4',
        emoji: '🌩️'
      },
      'teleportation in fiction': {
        label: 'teleportation in fiction',
        backgroundColor: '#b5f035',
        emoji: '🧪'
      },
      'levitation': {
        label: 'levitation',
        backgroundColor: '#e398df',
        emoji: '🪽'
      }
    };

    return powerConfig[power] || {
      label: power,
      backgroundColor: '#9E9E9E',
      emoji: '❓'
    };
  }
}