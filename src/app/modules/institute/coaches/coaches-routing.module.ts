import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditCoachComponent } from './edit-coach/edit-coach.component';
import { ManageCoachesComponent } from './manage-coaches/manage-coaches.component';

const routes: Routes = [
  { path: '', component: ManageCoachesComponent },
  { path: 'add', component: EditCoachComponent },
  { path: 'edit/:id', component: EditCoachComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoachesRoutingModule { }
