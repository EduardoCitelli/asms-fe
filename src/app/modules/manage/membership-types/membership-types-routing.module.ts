import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditMembershipTypeComponent } from './edit-membership-type/edit-membership-type.component';
import { ManageMembershipTypesComponent } from './manage-membership-types/manage-membership-types.component';

const routes: Routes = [
  { path: '', component: ManageMembershipTypesComponent },
  { path: 'add', component: EditMembershipTypeComponent },
  { path: 'edit/:id', component: EditMembershipTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MembershipTypesRoutingModule { }
