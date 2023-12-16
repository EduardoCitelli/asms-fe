import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstituteMemberRoutingModule } from './institute-member-routing.module';
import { ManageInstituteMembersComponent } from './manage-institute-members/manage-institute-members.component';
import { EditInstituteMembersComponent } from './edit-institute-members/edit-institute-members.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageInstituteMembersComponent,
    EditInstituteMembersComponent
  ],
  imports: [
    CommonModule,
    InstituteMemberRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class InstituteMemberModule { }
