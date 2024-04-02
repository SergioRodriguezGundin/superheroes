import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

export enum SnackBar {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  private action = 'Close';

  private duration = 3000;

  private showSnackbar(
    message: string,
    type: SnackBar
  ) {
    const config: MatSnackBarConfig = {
      duration: this.duration,
      panelClass: [`snackbar-${type}`]
    };

    this.snackBar.open(message, this.action, config);
  }

  public showMessage(message: string, type: SnackBar) {
    this.showSnackbar(message, type);
  }
}