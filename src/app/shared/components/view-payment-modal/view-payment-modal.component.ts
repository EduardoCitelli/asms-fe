import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { catchError, tap } from 'rxjs';
import { PaymentsService } from 'src/app/core/services/payment.service';
import { PaymentSingleDto } from '../../interfaces/dtos/payments/payment-single-dto';

@Component({
  selector: 'app-view-payment-modal',
  templateUrl: './view-payment-modal.component.html',
  styleUrls: ['./view-payment-modal.component.scss']
})
export class ViewPaymentModalComponent implements OnInit {
  payment?: PaymentSingleDto;

  constructor(
    @Inject(MAT_DIALOG_DATA) public paymentId: number,
    private _dialogRef: MatDialogRef<ViewPaymentModalComponent>,
    private _paymentService: PaymentsService,
  ) {
    this._paymentService.getOne(this.paymentId)
    .pipe(
      tap(payment => {
        this.payment = payment;
      }),
      catchError(error => {
        return error;
      }
    )).subscribe();
  }

  ngOnInit(): void {

  }
}
