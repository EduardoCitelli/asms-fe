import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [
    ConfirmDialogComponent,
  ]
})
export class ConfirmDialogModule { }
