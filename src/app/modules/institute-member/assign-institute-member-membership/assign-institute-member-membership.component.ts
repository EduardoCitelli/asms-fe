import { Component, OnInit } from '@angular/core';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InstituteMemberMembershipService } from 'src/app/core/services/institute-member-membership.service';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, ValidationErrors, Validators } from '@angular/forms';
import { getControlError } from 'src/app/shared/utils/validators/get-input-errors';
import { MembershipService } from 'src/app/core/services/membership.service';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { MembershipComboDto } from 'src/app/shared/interfaces/dtos/memberships/membership-combo-dto';
import { UntilDestroy } from '@ngneat/until-destroy';
import { catchError, map } from 'rxjs';
import { PaymentType, getPaymentTypeLabel } from 'src/app/shared/interfaces/dtos/payments/payment-type.enum';
import { InstituteMemberMembershipCreateDto } from 'src/app/shared/interfaces/dtos/institute-member-membership/institute-member-membership-create-dto';
import { minLengthArray } from 'src/app/shared/utils/validators/array-min-length-validation';
import { DEFAULT_DATE_FORMAT } from 'src/app/shared/utils/constants';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-assign-institute-member-membership',
  templateUrl: './assign-institute-member-membership.component.html',
  styleUrls: ['./assign-institute-member-membership.component.css']
})
export class AssignInstituteMemberMembershipComponent {
  title: string;
  instituteMemberId: number;
  isUpdateMembership: boolean;

  today = new Date();
  minDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDay() - 1);
  maxDate: Date = new Date(this.today.getFullYear() + 1, 0, 1);


  activityList: ComboDto<number>[] = [];
  membershipList: MembershipComboDto[] = [];
  paymentTypes: PaymentType[] = [];

  selectedMemberhsip?: MembershipComboDto;

  form: FormGroup;
  membershipControl: FormControl;
  startDateControl: FormControl;
  activitiesControl: FormControl;

  formPayment: FormGroup;
  paymentTypeControl: FormControl;
  wantToPayControl: FormControl;

  private readonly updateMembershipPath = 'update-membership';

  constructor(
    private _formBuilder: FormBuilder,
    private _instituteMemberMembership: InstituteMemberMembershipService,
    private _membershipService: MembershipService,
    private _activityService: ActivitiesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
    private _datePipe: DatePipe,
  ) {
    this.membershipControl = new FormControl(undefined, [Validators.required]);
    this.startDateControl = new FormControl(this.today, [Validators.required]);
    this.activitiesControl = new FormControl(undefined);

    this.paymentTypeControl = new FormControl(undefined);
    this.wantToPayControl = new FormControl<boolean>(false);

    this.form = this._formBuilder.group({
      membership: this.membershipControl,
      startDate: this.startDateControl,
      activities: this.activitiesControl,
    });

    this.formPayment = this._formBuilder.group({
      paymentType: this.paymentTypeControl,
      wantToPay: this.wantToPayControl,
    });

    this.getMemberships();
    this.getActivities();
    this.getPaymentTypes();

    this.instituteMemberId = Number(_activatedRoute.snapshot.paramMap.get('id'));
    this.isUpdateMembership = this._activatedRoute.snapshot.url.some(x => x.path == this.updateMembershipPath);
    this.title = this.isUpdateMembership ? 'Cambiar membresía' : 'Asignar membresía';
  }

  getPaymentTypeDescription(paymentType: PaymentType) {
    return getPaymentTypeLabel(paymentType);
  }

  isOptionDisabled(id: number) {
    if (!!!this.activitiesControl.value) {
      return false;
    }

    return this.activitiesControl.value.length >= this.selectedMemberhsip?.activityQuantity! && !this.activitiesControl.value.find((activityId: number) => activityId == id)
  }

  onChangeMembership(value?: MembershipComboDto) {
    this.selectedMemberhsip = value;
    if (value?.activityQuantity) {
      this.activitiesControl.addValidators([Validators.required, minLengthArray(value.activityQuantity)]);
    }
    else {
      this.activitiesControl.clearValidators();
    }

    this.activitiesControl.reset();
  }

  onWantToPayCheck(check: boolean) {
    if (check) {
      this.paymentTypeControl.addValidators([Validators.required]);
    }
    else {
      this.paymentTypeControl.removeValidators([Validators.required]);
      this.paymentTypeControl.reset();
    }
  }

  save() {
    const request: InstituteMemberMembershipCreateDto = this.GetAssignMembershipRequest();

    const call = this.isUpdateMembership ? this._instituteMemberMembership.update(request) : this._instituteMemberMembership.create(request);

    call.pipe(
      map(() => {
        this.showSuccess("Membresía asignada con exito");
        this.goBack();
      }),
      catchError(error => {
        this.showError(error);
        return error;
      })
    ).subscribe();
  }

  getError(controlErrors: ValidationErrors | null) {
    return getControlError(controlErrors);
  }

  private getMemberships() {
    this._membershipService.getCombo().pipe(
      map(memberships => {
        this.membershipList = memberships;
      }),
      catchError(error => {
        this.showError("Error obteniendo membresías");
        return error;
      }),
    ).subscribe();
  }

  private getActivities() {
    this._activityService.getCombo().pipe(
      map(activities => {
        this.activityList = activities;
      }),
      catchError(error => {
        this.showError("Error obteniendo actividades");
        return error;
      })
    ).subscribe();
  }

  private getPaymentTypes() {
    let options = Object.values(PaymentType) as PaymentType[];
    this.paymentTypes = options.slice(options.length / 2);
  }

  private GetAssignMembershipRequest(): InstituteMemberMembershipCreateDto {
    return {
      instituteMemberId: this.instituteMemberId,
      membershipId: this.membershipControl.value.id,
      startDate: this._datePipe.transform(this.startDateControl.value, DEFAULT_DATE_FORMAT)!,
      activities: this.activitiesControl.value,
      payment: this.wantToPayControl.value ? {
        paymentType: this.paymentTypeControl.value,
        amount: 1,
      } : undefined,
    };
  }

  private showSuccess(message: string) {
    this._toastrService.success(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }

  private goBack() {
    this._location.back();
  }
}
