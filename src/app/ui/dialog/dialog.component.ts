import { ChangeDetectionStrategy, Component, Inject, Type } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { NgComponentOutlet } from '@angular/common';

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
    MatButtonModule,
    MatIcon
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
