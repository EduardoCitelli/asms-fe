import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMembershipComponent } from './edit-membership/edit-membership.component';
import { ManageMembershipsComponent } from './manage-memberships/manage-memberships.component';

const routes: Routes = [
  { path: '', component: ManageMembershipsComponent },
  { path: 'add', component: EditMembershipComponent },
  { path: 'edit/:id', component: EditMembershipComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipsRoutingModule { }
