import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { InstituteMemberRoutingModule } from './institute-member-routing.module';
import { ManageInstituteMembersComponent } from './manage-institute-members/manage-institute-members.component';
import { EditInstituteMembersComponent } from './edit-institute-members/edit-institute-members.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { AssignInstituteMemberMembershipComponent } from './assign-institute-member-membership/assign-institute-member-membership.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MakePaymentDialogComponent } from './make-payment-dialog/make-payment-dialog.component'


@NgModule({
  declarations: [
    ManageInstituteMembersComponent,
    EditInstituteMembersComponent,
    AssignInstituteMemberMembershipComponent,
    MakePaymentDialogComponent,
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
