import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { ClassesRoutingModule } from './classes-routing.module';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';


@NgModule({
  declarations: [
    ManageClassesComponent,
    EditClassComponent,
  ],
  imports: [
    CommonModule,
    ClassesRoutingModule,
    MaterialManageFormsModule,
    NgxMatTimepickerModule,
  ],
  providers: [
    DatePipe,
  ]
})
export class ClassesModule { }