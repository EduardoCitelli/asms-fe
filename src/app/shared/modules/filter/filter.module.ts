import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FilterComponent } from './filter.component';
import { MaterialManageFormsModule } from '../../material-manage-forms/material-manage-forms.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

@NgModule({
  declarations: [
    FilterComponent
  ],
  imports: [
    CommonModule,
    MaterialManageFormsModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    DatePipe,
  ],
  exports: [
    FilterComponent,
  ]
})
export class FilterModule { }
