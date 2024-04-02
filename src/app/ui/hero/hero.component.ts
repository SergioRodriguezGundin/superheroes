import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChip } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MarvelHero } from '../../feature/marvel/interfaces/marvel.interface';
import { MarvelHeroCitizenPipe } from '../../feature/marvel/pipes/hero-citizen-pipe/marvel-hero-citizen.pipe';
import { MarvelHeroCreatorPipe } from '../../feature/marvel/pipes/hero-creator-pipe/marvel-hero-creator.pipe';
import { MarvelHeroGenderPipe } from '../../feature/marvel/pipes/hero-gender-pipe/hero-gender.pipe';
import { MarvelHeroMemberOfPipe } from '../../feature/marvel/pipes/hero-member-of-pipe/marvel-hero-member-of.pipe';
import { MarvelHeroOccupationPipe } from '../../feature/marvel/pipes/hero-occupation-pipe/marvel-hero-occupation.pipe';
import { MarvelHeroPowerChipPipe } from '../../feature/marvel/pipes/hero-power-pipe/hero-power-chip.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MarvelHeroPowerChipPipe, MarvelHeroGenderPipe, MarvelHeroCreatorPipe, MarvelHeroCitizenPipe, MarvelHeroMemberOfPipe, MarvelHeroOccupationPipe, MatChip, MatCardModule, MatGridListModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  hero = input<MarvelHero>();
}
