import { CommonModule } from '@angular/common';
import { Component, effect, input, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Gender, MarvelHero } from '../../interfaces/hero.interface';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatLabel, MatError, MatButton, MatRadioModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  heroSelected = input<MarvelHero | null>();

  addHero = output<MarvelHero>();

  updateHero = output<MarvelHero>();

  cancelForm = output<void>();

  heroForm = new FormGroup({
    nameLabel: new FormControl('', Validators.required),
    creatorLabel: new FormControl('', Validators.required),
    citizenshipLabel: new FormControl('', Validators.required),
    occupationLabel: new FormControl('', Validators.required),
    skillsLabel: new FormControl('', Validators.required),
    memberOfLabel: new FormControl('', Validators.required),
    genderLabel: new FormControl('male', Validators.required),
  });

  constructor() {
    this.listenToHeroSelected();
  }

  onSubmit() {
    if (this.heroForm.valid) {
      if (this.heroSelected()) {
        this.updateHero.emit({ ...this.heroForm.value, id: this.heroSelected()?.id } as MarvelHero);
      } else {
        this.addHero.emit(this.heroForm.value as MarvelHero);
      }
      this.resetForm();
    }
  }

  public emitCancelForm() {
    this.cleanErrors();
    this.cancelForm.emit();
  }

  private resetForm() {
    this.heroForm.reset({
      genderLabel: Gender.Male
    });
    this.cleanErrors();
  }

  private cleanErrors() {
    Object.keys(this.heroForm.controls).forEach((key) => {
      this.heroForm.get(key)?.setErrors(null);
    });
  }

  private listenToHeroSelected() {
    effect(() => {
      const hero = this.heroSelected();
      if (hero) {
        this.heroForm.patchValue(hero);
      } else {
        this.heroForm.reset({
          genderLabel: Gender.Male,
          nameLabel: '',
        });
      }
    });
  }
}
