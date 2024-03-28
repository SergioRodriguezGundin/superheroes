import { Component } from '@angular/core';
import { SuperheroesLayoutComponent } from './layout/superheroes-layout/superheroes-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SuperheroesLayoutComponent],
  template: '<app-superheroes-layout/>',
})
export class AppComponent {
}
