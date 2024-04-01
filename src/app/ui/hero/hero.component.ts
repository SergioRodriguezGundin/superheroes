import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';
import { MarvelHeroPowerChipPipe } from '../../feature/marvel/pipes/hero-power-pipe/marvel-hero-power-chip.pipe';
import { MatChip } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { HeroGenderPipe } from '../../feature/marvel/pipes/hero-gender-pipe/hero-gender.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MarvelHeroPowerChipPipe, HeroGenderPipe, MatChip, MatCardModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  hero = input<MarvelHero>();
}
