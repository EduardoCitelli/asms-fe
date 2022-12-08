import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditActivityComponent } from './edit-activity/edit-activity.component';
import { ManageActivitiesComponent } from './manage-activities/manage-activities.component';

const routes: Routes = [
  { path: '', component: ManageActivitiesComponent },
  { path: 'add', component: EditActivityComponent },
  { path: 'edit/:id', component: EditActivityComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivitiesRoutingModule { }
