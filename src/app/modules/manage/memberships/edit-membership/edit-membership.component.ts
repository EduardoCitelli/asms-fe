import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, tap, throwError } from 'rxjs';
import { MembershipTypeService } from 'src/app/core/services/membership-type.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { MembershipCreateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-create-dto';
import { MembershipSingleDto } from 'src/app/shared/interfaces/dtos/memberships/membership-single-dto';
import { MembershipUpdateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-update-dto';
import { getControlError } from 'src/app/shared/utils/validators/get-input-errors';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.scss']
})
export class EditMembershipComponent implements OnInit {
  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  typeDtos: ComboDto<number>[] = [];

  nameControl: FormControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  descriptionControl: FormControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  isPremiumControl: FormControl = new FormControl(false);
  membershipTypeIdControl: FormControl = new FormControl<ComboDto<number> | undefined>(undefined, Validators.required);
  priceControl: FormControl = new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]);
  activityQuantityControl: FormControl = new FormControl<number | undefined>(undefined, [Validators.min(1), Validators.required]);

  constructor(
    private _formBuilder: FormBuilder,
    private _membershipService: MembershipService,
    private _membershipTypeService: MembershipTypeService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      name: this.nameControl,
      description: this.descriptionControl,
      isPremium: this.isPremiumControl,
      membershipTypeId: this.membershipTypeIdControl,
      price: this.priceControl,
      activityQuantity: this.activityQuantityControl,
    });
  }

  ngOnInit(): void {
    this.getComboInfo();

    const membershipId = this._activatedRoute.snapshot.paramMap.get('id');

    if (membershipId) {
      this.id = Number(membershipId);
      this.isEdit = true;

      this.getAndSetFormInfo();
    }

    this.changeTitle();
  }

  onPremiumCheck(isPremium: boolean) {
    if (isPremium) {
      this.activityQuantityControl.removeValidators(Validators.required);
      this.activityQuantityControl.reset(null);
    }
    else {
      this.activityQuantityControl.addValidators(Validators.required);
    }
  }

  getError(controlErrors: ValidationErrors | null) {
    return getControlError(controlErrors)
  }

  public save() {
    const dto = this.formToDto();

    if (this.isEdit)
      this.update(dto);
    else
      this.add(dto);
  }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR MEMBRESIA";
    } else {
      this.title = "AGREGAR NUEVA MEMBRESIA";
    }
  }

  private formToDto(): MembershipSingleDto {
    return {
      id: this.id,
      name: this.nameControl.value,
      description: this.descriptionControl.value,
      isPremium: this.isPremiumControl.value,
      membershipTypeId: this.membershipTypeIdControl.value,
      price: this.priceControl.value,
      activityQuantity: this.activityQuantityControl.value,
    }
  }

  private getComboInfo(): void {
    this._membershipTypeService.getCombo()
      .subscribe(x => {
        this.typeDtos = x;
      },
        error => this.showError(error));
  }

  private getAndSetFormInfo(): void {
    this._membershipService.getOne(this.id)
      .pipe(
        map(response => {
          this.nameControl.setValue(response.name);
          this.descriptionControl.setValue(response.description);
          this.isPremiumControl.setValue(response.isPremium);
          this.membershipTypeIdControl.setValue(response.membershipTypeId);
          this.priceControl.setValue(response.price);
          this.activityQuantityControl.setValue(response.activityQuantity);
        }),
        catchError(error => {
          this.showError(error);
          return error;
        })
      )
      .subscribe();
  }

  private add(dto: MembershipCreateDto): void {
    this._membershipService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Membresia Creada");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return error;
      }))
      .subscribe();
  }

  private update(dto: MembershipUpdateDto): void {
    this._membershipService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Membresia Actualizada.");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return error;
      }))
      .subscribe();
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
