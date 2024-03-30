import { CommonModule } from '@angular/common';
import { Component, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MarvelHero } from '../interfaces/marvel.interface';
import { MarvelService } from '../marvel.service';


@Component({
  selector: 'app-hero-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatLabel, MatError, MatButton, MatRadioModule],
  templateUrl: './hero-form.component.html',
  styleUrl: './hero-form.component.scss'
})
export class HeroFormComponent {
  heroSubmitted = output<MarvelHero>();

  heroForm = new FormGroup({
    nameLabel: new FormControl('', Validators.required),
    creatorLabel: new FormControl('', Validators.required),
    citizenshipLabel: new FormControl('', Validators.required),
    occupationLabel: new FormControl('', Validators.required),
    skillsLabel: new FormControl('', Validators.required),
    memberOfLabel: new FormControl('', Validators.required),
    genderLabel: new FormControl('Male', Validators.required),
  });

  onSubmit() {
    if (this.heroForm.valid) {
      this.heroSubmitted.emit(this.heroForm.value as MarvelHero);
    }
  }
}
