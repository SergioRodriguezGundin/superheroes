import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-superheroes-layout',
  standalone: true,
  imports: [RouterOutlet, MatToolbarModule],
  templateUrl: './superheroes-layout.component.html',
  styleUrl: './superheroes-layout.component.scss'
})
export class SuperheroesLayoutComponent {
  title = 'Superheroes';
}
