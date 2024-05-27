import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { EditInstituteComponent } from './edit-institute/edit-institute.component';

const routes: Routes = [
  { path: '', component: ManageInstitutesComponent },
  { path: 'add', component: EditInstituteComponent },
  { path: 'edit/:id', component: EditInstituteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitutesRoutingModule { }
