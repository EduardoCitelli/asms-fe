import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserGridComponent } from './user-grid/user-grid.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BasicUserGridModule } from '../shared/basic-user-grid/basic-user-grid.module';


@NgModule({
  declarations: [
    UserGridComponent,
    EditUserComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialManageFormsModule,
    MatSlideToggleModule,
    BasicUserGridModule,
  ]
})
export class UsersModule { }
