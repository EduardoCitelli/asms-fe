import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MembershipsRoutingModule } from './memberships-routing.module';
import { ManageMembershipsComponent } from './manage-memberships/manage-memberships.component';
import { EditMembershipComponent } from './edit-membership/edit-membership.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';

@NgModule({
  declarations: [
    ManageMembershipsComponent,
    EditMembershipComponent
  ],
  imports: [
    CommonModule,
    MembershipsRoutingModule,
    MaterialManageFormsModule,
  ],
})
export class MembershipsModule { }
