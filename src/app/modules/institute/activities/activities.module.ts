import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesRoutingModule } from './activities-routing.module';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageActivitiesComponent,
    EditActivityComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class ActivitiesModule { }
