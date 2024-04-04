import { Component, input, output } from '@angular/core';

interface TableInterface {
  [x: string]: any;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [],
  template: '',
})
export abstract class TableComponent<T extends TableInterface> {
  [x: string]: any;
  dataTable = input<T[]>([]);

  selectedRow = output<T>();

  rowToUpdate = output<T>();

  rowToDeleted = output<T>();

  public selectRow(row: T) {
    this.selectedRow.emit(row);
  }

  public updateRow(row: T) {
    this.rowToUpdate.emit(row);
  }

  public deleteRow(row: T) {
    this.rowToDeleted.emit(row);
  }
}
