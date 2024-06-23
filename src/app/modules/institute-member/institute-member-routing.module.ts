import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageInstituteMembersComponent } from './manage-institute-members/manage-institute-members.component';
import { EditInstituteMembersComponent } from './edit-institute-members/edit-institute-members.component';
import { AssignInstituteMemberMembershipComponent } from './assign-institute-member-membership/assign-institute-member-membership.component';

const routes: Routes = [
  { path: '', component: ManageInstituteMembersComponent },
  { path: 'add', component: EditInstituteMembersComponent },
  { path: 'edit/:id', component: EditInstituteMembersComponent },
  { path: 'assign-membership/:id', component: AssignInstituteMemberMembershipComponent },
  { path: 'update-membership/:id', component: AssignInstituteMemberMembershipComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstituteMemberRoutingModule { }
