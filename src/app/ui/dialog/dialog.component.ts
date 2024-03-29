import { NgComponentOutlet } from '@angular/common';
import { Component, Inject, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';

export interface DialogInputs {
  title: string;
  content: ContentDialog
  actions: Type<any> | null;
}

export interface ContentDialog {
  component: Type<any>;
  inputs: Record<string, unknown> | undefined;
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    NgComponentOutlet,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  title = 'Dialog';

  content: ContentDialog = {
    component: NgComponentOutlet,
    inputs: {}
  };

  actions: Type<any> | null = null;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogInputs) {
    this.injectDialogInputs(data);
  }

  private injectDialogInputs(data: DialogInputs) {
    this.title = data.title;
    this.content.component = data.content.component;
    this.content.inputs = data.content.inputs;
    this.actions = data.actions;
  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
