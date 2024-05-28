import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutesRoutingModule } from './institutes-routing.module';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { EditInstituteComponent } from './edit-institute/edit-institute.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageInstitutesComponent,
    EditInstituteComponent
  ],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class InstitutesModule { }
