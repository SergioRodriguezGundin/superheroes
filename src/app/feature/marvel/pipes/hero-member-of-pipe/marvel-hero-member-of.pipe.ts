import { Pipe, PipeTransform } from '@angular/core';
import { HeroPropertiePipeConfig } from '../../interfaces/hero.interface';

export const HERO_MEMBER_OF_DEFAULT = 'Stan Lee';

@Pipe({
  name: 'marvelHeroMemberOf',
  standalone: true
})
export class MarvelHeroMemberOfPipe implements PipeTransform {
  private randomColor = ['#FFC107', '#FF5722', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5', '#2196F3', '#03A9F4', '#00BCD4', '#009688', '#4CAF50', '#8BC34A', '#CDDC39', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722', '#795548', '#9E9E9E', '#607D8B'];

  transform(memberOf: string = HERO_MEMBER_OF_DEFAULT): HeroPropertiePipeConfig {
    const color = this.randomColor[Math.floor(Math.random() * this.randomColor.length)];

    return {
      label: memberOf,
      backgroundColor: color,
      emoji: '🎖️'
    };
  }

}
