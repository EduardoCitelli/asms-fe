import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { ViewPaymentModalComponent } from './components/view-payment-modal/view-payment-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';



@NgModule({
  declarations: [
    ViewPaymentModalComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    FlexLayoutModule,
    ToastrModule.forRoot(),
  ],
  exports: [
    ViewPaymentModalComponent,
  ]
})
export class SharedModule { }
