import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { InstituteService } from 'src/app/core/services/institute.service';
import { InstituteCreateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-create-dto';
import { InstituteSingleDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-single-dto';
import { InstituteUpdateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-update-dto';
import { isNumber } from 'src/app/shared/utils/check-number';
import { getControlError } from 'src/app/shared/utils/validators/get-input-errors';
import { identificationNumberValidator } from 'src/app/shared/utils/validators/identification-number.validator';
import { phoneValidator } from 'src/app/shared/utils/validators/phone.validator';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-institute',
  templateUrl: './edit-institute.component.html',
  styleUrls: ['./edit-institute.component.scss']
})
export class EditInstituteComponent {
  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  cuitMask = [/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];

  firstNameControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  lastNameControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  emailControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), Validators.email]);
  birthDateControl = new FormControl<Date | undefined>(undefined);
  phoneControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), phoneValidator()]);

  addressStreetControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  addressNumberControl = new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]);
  addressExtraInfoControl = new FormControl<string | undefined>(undefined);
  identificationNumberControl = new FormControl<number | undefined>(undefined, [Validators.required, identificationNumberValidator()]);
  institutionNameControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);

  userNameControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]);
  passwordControl = new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(7)]);

  constructor(
    private _formBuilder: FormBuilder,
    private _service: InstituteService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 5, 0, 1);

    this.form = this._formBuilder.group({
      birthDate: this.birthDateControl,
      phone: this.phoneControl,
      addressStreet: this.addressStreetControl,
      addressNumber: this.addressNumberControl,
      addressExtraInfo: this.addressExtraInfoControl,
      identificationNumber: this.identificationNumberControl,

      institutionName: this.institutionNameControl,
    });
  }

  ngOnInit(): void {
    const instituteId = this._activatedRoute.snapshot.paramMap.get('id');

    if (instituteId) {
      this.id = Number(instituteId);
      this.isEdit = true;
      this.getAndSetFormInfo();
    }
    else {
      this.form.addControl('password', this.passwordControl);
      this.form.addControl('user', this.userNameControl);
      this.form.addControl('firstName', this.firstNameControl);
      this.form.addControl('lastName', this.lastNameControl);
      this.form.addControl('email', this.emailControl);
    }

    this.changeTitle();
  }

  getValidationError(controlErrors: ValidationErrors | null): string {
    return getControlError(controlErrors);
  }

  save() {
    if (this.isEdit) {
      const dto = this.formToUpdateDto();
      this.update(dto);
    }
    else {
      const dto = this.formToCreateDto();
      this.add(dto);
    }
  }

  private formToUpdateDto(): InstituteUpdateDto {
    return {
      id: this.id,
      personalInfo: {
        birthDate: this.DateChangeCreator(this.birthDateControl.value as Date),
        phone: this.phoneControl.value!,
        addressStreet: this.addressStreetControl.value!,
        addressNumber: this.addressNumberControl.value!,
        addressExtraInfo: this.addressExtraInfoControl.value!,
        identificationNumber: isNumber(this.identificationNumberControl.value) ? this.identificationNumberControl.value! : Number(this.identificationNumberControl.value!.toString().replace(/-/g, ""))!,
      },

      institutionName: this.institutionNameControl.value!,
    }
  }

  private DateChangeCreator(date: Date): string {
    const selectedDate = date.toISOString().split('T')[0];
    return selectedDate;
  }

  private formToCreateDto(): InstituteCreateDto {
    return {
      user: {
        userName: this.userNameControl.value!,
        firstName: this.firstNameControl.value!,
        lastName: this.lastNameControl.value!,
        email: this.emailControl.value!,
        password: this.passwordControl.value!,
      },
      personalInfo: {
        birthDate: this.DateChangeCreator(this.birthDateControl.value!),
        phone: this.phoneControl.value!,
        addressStreet: this.addressStreetControl.value!,
        addressNumber: this.addressNumberControl.value!,
        addressExtraInfo: this.addressExtraInfoControl.value!,
        identificationNumber: Number(this.identificationNumberControl.value?.toString().replace(/-/g, "")),
      },

      institutionName: this.institutionNameControl.value!,
    }
  }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR INSTITUCIÓN";
    } else {
      this.title = "AGREGAR NUEVA INSTITUCIÓN";
    }
  }

  private add(dto: InstituteCreateDto): void {
    this._service.create(dto).pipe(
      tap(() => {
        this.showSuccess("Institución Creada");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private update(dto: InstituteUpdateDto): void {
    this._service.update(dto).pipe(
      tap(() => {
        this.showSuccess("Institución Actualizada.");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private getAndSetFormInfo(): void {
    this._service.getOne(this.id)
      .subscribe({
        next: (response: InstituteSingleDto) => {
          // This will return an ISO string matching your local time.
          const d = new Date(response.personalInfo.birthDate)
          this.birthDateControl.setValue(new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + d.getTimezoneOffset()));

          this.phoneControl.setValue(response.personalInfo.phone);
          this.addressStreetControl.setValue(response.personalInfo.addressStreet);
          this.addressNumberControl.setValue(response.personalInfo.addressNumber);
          this.addressExtraInfoControl.setValue(response.personalInfo.addressExtraInfo);
          this.identificationNumberControl.setValue(response.personalInfo.identificationNumber);

          this.institutionNameControl.setValue(response.institutionName);
        },
        error: error => {
          this.showError(error);
        },
      });
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
