import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageClassBlockModalComponent } from './manage-class-block-modal.component';
import { MaterialManageFormsModule } from '../../material-manage-forms/material-manage-forms.module';

@NgModule({
  declarations: [
    ManageClassBlockModalComponent,
  ],
  imports: [
    CommonModule,
    MaterialManageFormsModule,
  ],
  exports: [
    ManageClassBlockModalComponent,
  ]
})
export class ManageClassBlockModalModule { }
