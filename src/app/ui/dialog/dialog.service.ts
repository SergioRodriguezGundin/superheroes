import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent, DialogInputs } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialog = inject(MatDialog);

  private dialogInstance!: MatDialogRef<DialogComponent, any>;

  public getDialog() {
    return this.dialogInstance;
  }

  public open(dialogInputs: DialogInputs) {
    this.dialogInstance = this.dialog.open(DialogComponent, {
      data: dialogInputs
    });
  }
}