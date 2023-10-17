import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlansRoutingModule } from './plans-routing.module';
import { ManagePlansComponent } from './manage-plans/manage-plans.component';
import { EditPlansComponent } from './edit-plans/edit-plans.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';


@NgModule({
  declarations: [
    ManagePlansComponent,
    EditPlansComponent
  ],
  imports: [
    CommonModule,
    PlansRoutingModule,
    MaterialManageFormsModule,
  ],
})
export class PlansModule { }
