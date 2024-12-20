import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    MaterialManageFormsModule,
  ],
})
export class ManageUsersModule { }
