import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { <%= classify(dialogName) %>Component } from './<%= dasherize(dialogName) %>.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: '<%= dasherize(prefix) %>-<%= dasherize(dialogBodyName) %>',
  styleUrls: ['./<%= dasherize(dialogBodyName) %>.component.scss'],
  templateUrl: './<%= dasherize(dialogBodyName) %>.component.html'
})
export class <%= classify(dialogBodyName) %>Component {

  parent: <%= classify(dialogName) %>Component;

  constructor(
    private dialogRef: MatDialogRef<<%= classify(dialogBodyName) %>Component>,
    @Inject(MAT_DIALOG_DATA) private data: { parent: <%= classify(dialogName) %>Component}
  ) {
    this.parent = data.parent;
  }

  close(): void {
    this.dialogRef.close();
  }
}
