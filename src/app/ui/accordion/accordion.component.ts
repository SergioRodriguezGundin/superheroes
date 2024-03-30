import { ChangeDetectionStrategy, Component, ViewChild, effect, input } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './accordion.component.html',
  styleUrl: './accordion.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent {
  @ViewChild(MatAccordion)
  accordion!: MatAccordion;

  expansionPanelTitle = input('Expansion panel title');

  expansionPanelHeader = input(true);

  openAccordion = input(false);

  constructor() {
    effect(() => {
      const openMatAccordion = this.openAccordion();
      openMatAccordion ? this.accordion.openAll() : this.accordion.closeAll();
    })
  }
}
