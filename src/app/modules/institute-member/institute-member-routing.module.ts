import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInstituteMembersComponent } from './manage-institute-members/manage-institute-members.component';
import { EditInstituteMembersComponent } from './edit-institute-members/edit-institute-members.component';

const routes: Routes = [
  { path: '', component: ManageInstituteMembersComponent },
  { path: 'add', component: EditInstituteMembersComponent },
  { path: 'edit/:id', component: EditInstituteMembersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteMemberRoutingModule { }
