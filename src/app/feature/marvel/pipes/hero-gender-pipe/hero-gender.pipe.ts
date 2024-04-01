import { Pipe, PipeTransform } from '@angular/core';

interface GenderHeroPipeConfig {
  label: string;
  backgroundColor: string;
  emoji: string;
}

export const HERO_GENDER_DEFAULT = 'male';

@Pipe({
  name: 'heroGenderPipe',
  standalone: true
})
export class HeroGenderPipe implements PipeTransform {
  transform(gender: string = HERO_GENDER_DEFAULT): GenderHeroPipeConfig {
    const genderChipConfig: { [key: string]: GenderHeroPipeConfig } = {
      'male': {
        label: 'Male',
        backgroundColor: '#4CAF50',
        emoji: '♂️'
      },
      'female': {
        label: 'Female',
        backgroundColor: '#E91E63',
        emoji: '♀️'
      }
    };

    return genderChipConfig[gender] || {
      label: 'Unknown Gender',
      backgroundColor: '#9E9E9E',
      emoji: '❓'
    };
  }
}
