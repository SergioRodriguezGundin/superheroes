import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  hero = input<MarvelHero>();
}
