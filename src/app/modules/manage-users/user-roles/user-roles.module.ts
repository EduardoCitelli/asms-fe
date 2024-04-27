import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRolesRoutingModule } from './user-roles-routing.module';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';
import { BasicUserGridModule } from '../shared/basic-user-grid/basic-user-grid.module';
import { RolesShelfComponent } from './roles-shelf/roles-shelf.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManageUserRolesComponent,
    RolesShelfComponent,
  ],
  imports: [
    CommonModule,
    UserRolesRoutingModule,
    BasicUserGridModule,
    MaterialManageFormsModule,
  ]
})
export class UserRolesModule { }
