import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, map } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { PaymentsService } from 'src/app/core/services/payment.service';
import { PaymentCreateDto } from 'src/app/shared/interfaces/dtos/payments/payment-create-dto';
import { PaymentType, getPaymentTypeLabel } from 'src/app/shared/interfaces/dtos/payments/payment-type.enum';
import { getControlError } from 'src/app/shared/utils/validators/get-input-errors';
import { MakePaymentModel } from './models/make-payment-model';

@Component({
  selector: 'app-make-payment-dialog',
  templateUrl: './make-payment-dialog.component.html',
  styleUrls: ['./make-payment-dialog.component.scss']
})
export class MakePaymentDialogComponent {
  paymentTypes: PaymentType[] = [];

  form: FormGroup;
  amountControl: FormControl;
  paymentTypeControl: FormControl;
  updateByExpirationDateControl: FormControl;

  constructor(
    private _dialogRef: MatDialogRef<MakePaymentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MakePaymentModel,
    private _paymentService: PaymentsService,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
    private _formBuilder: FormBuilder,
  ) {
    this.amountControl = new FormControl(data.remainingPayment, [Validators.required, Validators.max(data.remainingPayment), Validators.min(1)]);
    this.paymentTypeControl = new FormControl(undefined, [Validators.required]);
    this.updateByExpirationDateControl = new FormControl(true, [Validators.required]);

    this.form = this._formBuilder.group({
      amount: this.amountControl,
      paymentType: this.paymentTypeControl,
      updateByExpirationDate: this.updateByExpirationDateControl,
    });

    this.getPaymentTypes();
  }

  getError(controlErrors: ValidationErrors | null) {
    return getControlError(controlErrors)
  }

  getPaymentTypeDescription(type: PaymentType) {
    return getPaymentTypeLabel(type);
  }

  saveChanges() {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea realizar el pago?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.makePayment();
        }
      });
  }

  private makePayment() {
    const paymentRequest: PaymentCreateDto = this.getPaymentRequest()

    const action = this.data.isForcePayment ? this._paymentService.createForce(paymentRequest) : this._paymentService.create(paymentRequest);

    action.pipe(
      map(() => {
        this.showSuccess("Pago realizado con exito");
        this._dialogRef.close(true);
      }),
      catchError(error => {
        this.showError(error);
        return error;
      }))
      .subscribe();
  }

  private getPaymentRequest(): PaymentCreateDto {
    return {
      instituteMemberId: this.data.instituteMemberId,
      amount: this.amountControl.value,
      paymentType: this.paymentTypeControl.value,
      updateByExpirationDate: this.updateByExpirationDateControl.value,
    };
  }

  private getPaymentTypes() {
    let options = Object.values(PaymentType) as PaymentType[];
    this.paymentTypes = options.slice(options.length / 2);
  }

  private showSuccess(message: string) {
    this._toastrService.success(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }
}
