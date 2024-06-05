import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutesRoutingModule } from './institutes-routing.module';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { EditInstituteComponent } from './edit-institute/edit-institute.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SetInstitutePlanDialogComponent } from './set-institute-plan-dialog/set-institute-plan-dialog.component';
import { MatListModule } from '@angular/material/list';


@NgModule({
  declarations: [
    ManageInstitutesComponent,
    EditInstituteComponent,
    SetInstitutePlanDialogComponent
  ],
  imports: [
    CommonModule,
    InstitutesRoutingModule,
    MaterialManageFormsModule,
    MatSlideToggleModule,
    MatListModule,
  ]
})
export class InstitutesModule { }
