import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentsRoutingModule } from './payments-routing.module';
import { ManagePaymentsComponent } from './manage-payments/manage-payments.component';
import { MaterialManageFormsModule } from 'src/app/shared/material-manage-forms/material-manage-forms.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatListModule } from '@angular/material/list';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { FilterModule } from 'src/app/shared/modules/filter/filter.module';


@NgModule({
  declarations: [
    ManagePaymentsComponent
  ],
  imports: [
    CommonModule,
    PaymentsRoutingModule,
    MaterialManageFormsModule,
    MatSlideToggleModule,
    MatListModule,
    NgxMatTimepickerModule,
    FilterModule,
  ]
})
export class PaymentsModule { }
