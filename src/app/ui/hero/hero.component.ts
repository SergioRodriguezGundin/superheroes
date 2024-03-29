import { Component, input } from '@angular/core';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  hero = input<MarvelHero>();
}
