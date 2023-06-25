import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';


@NgModule({
  declarations: [
    ManageStaffComponent,
    EditStaffComponent
  ],
  imports: [
    CommonModule,
    StaffRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class StaffModule { }
