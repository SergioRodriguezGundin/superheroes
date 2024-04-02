import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { HeroAttributePipe } from '../../pipes/hero-attributes-pipe/marvel-hero-attributes.pipe';
import { MarvelHero } from '../../interfaces/hero.interface';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [HeroAttributePipe, MatChip, MatCardModule, MatGridListModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  hero = input<MarvelHero>();
}
