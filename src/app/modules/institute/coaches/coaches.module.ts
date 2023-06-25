import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoachesRoutingModule } from './coaches-routing.module';
import { ManageCoachesComponent } from './manage-coaches/manage-coaches.component';
import { EditCoachComponent } from './edit-coach/edit-coach.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageCoachesComponent,
    EditCoachComponent
  ],
  imports: [
    CommonModule,
    CoachesRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class CoachesModule { }
