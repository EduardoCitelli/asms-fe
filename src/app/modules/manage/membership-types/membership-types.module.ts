import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipTypesRoutingModule } from './membership-types-routing.module';
import { ManageMembershipTypesComponent } from './manage-membership-types/manage-membership-types.component';
import { EditMembershipTypeComponent } from './edit-membership-type/edit-membership-type.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageMembershipTypesComponent,
    EditMembershipTypeComponent
  ],
  imports: [
    CommonModule,
    MembershipTypesRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class MembershipTypesModule { }
