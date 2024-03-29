import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Output, ViewChild, effect, input, output, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatIconModule, MatChipsModule, MatAutocompleteModule, ReactiveFormsModule, AsyncPipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchType = input<string>();

  searchItems = input<string[]>([]);

  queryCtrl = signal<string>('');

  search = output<string[]>();

  records: string[] = []

  filteredRecords: string[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA];

  constructor() {
    this.filteredRecordsByQuery();
  }

  private filteredRecordsByQuery() {
    effect(() => {
      const valueToSearch = this.queryCtrl();
      this.filteredRecords = valueToSearch ? this._filter(valueToSearch) : this.searchItems();
    })
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.searchItems().filter(record => record.toLowerCase().includes(filterValue));
  }

  private sendQuery() {
    this.search.emit(this.records);
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    debugger;

    if (value) {
      this.records.push(value);
    }

    event.chipInput!.clear();
    this.queryCtrl.set('');
  }

  remove(fruit: string): void {
    const index = this.records.indexOf(fruit);

    if (index >= 0) {
      this.records.splice(index, 1);
      this.sendQuery();
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.records.push(event.option.viewValue);
    this.sendQuery();
    this.queryCtrl.set('');
  }
}
