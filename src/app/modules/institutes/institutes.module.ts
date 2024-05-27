import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstitutesRoutingModule } from './institutes-routing.module';
import { ManageInstitutesComponent } from './manage-institutes/manage-institutes.component';
import { EditInstituteComponent } from './edit-institute/edit-institute.component';


@NgModule({
  declarations: [
    ManageInstitutesComponent,
    EditInstituteComponent
  ],
  imports: [
    CommonModule,
    InstitutesRoutingModule
  ]
})
export class InstitutesModule { }
