import { Component, input } from '@angular/core';

@Component({
  selector: 'app-column-summary',
  standalone: true,
  imports: [],
  templateUrl: './column-summary.component.html',
  styleUrl: './column-summary.component.scss'
})
export class ColumnSummaryComponent {
  title = input<string>('Total entries');

  totalEntries = input<number>(0);
}
