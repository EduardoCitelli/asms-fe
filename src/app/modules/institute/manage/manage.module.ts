import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyInstituteComponent } from './my-institute/my-institute.component';
import { ManageRoutingModule } from './manage-routing.module';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';

@NgModule({
  declarations: [
    MyInstituteComponent
  ],
  imports: [
    CommonModule,
    ManageRoutingModule,
    MaterialManageFormsModule,
  ]
})
export class ManageModule { }
