import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InstituteMemberRoutingModule } from './institute-member-routing.module';
import { ManageInstituteMembersComponent } from './manage-institute-members/manage-institute-members.component';
import { EditInstituteMembersComponent } from './edit-institute-members/edit-institute-members.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { AssignInstituteMemberMembershipComponent } from './assign-institute-member-membership/assign-institute-member-membership.component';
import { MatStepperModule } from '@angular/material/stepper'


@NgModule({
  declarations: [
    ManageInstituteMembersComponent,
    EditInstituteMembersComponent,
    AssignInstituteMemberMembershipComponent
  ],
  imports: [
    CommonModule,
    InstituteMemberRoutingModule,
    MaterialManageFormsModule,
    MatStepperModule,
  ],
  providers: [
    DatePipe
  ]
})
export class InstituteMemberModule { }
