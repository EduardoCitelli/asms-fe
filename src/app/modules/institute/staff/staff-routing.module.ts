import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageStaffComponent } from './manage-staff/manage-staff.component';
import { EditStaffComponent } from './edit-staff/edit-staff.component';

const routes: Routes = [
  { path: '', component: ManageStaffComponent },
  { path: 'add', component: EditStaffComponent },
  { path: 'edit/:id', component: EditStaffComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
