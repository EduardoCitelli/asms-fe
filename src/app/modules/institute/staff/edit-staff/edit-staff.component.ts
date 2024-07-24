import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { StaffService } from 'src/app/core/services/staff.service';
import { StaffCreateDto } from 'src/app/shared/interfaces/dtos/staff/staff-create-dto';
import { StaffSingleDto } from 'src/app/shared/interfaces/dtos/staff/staff-single-dto';
import { StaffUpdateDto } from 'src/app/shared/interfaces/dtos/staff/staff-update-dto';
import { isNumber } from 'src/app/shared/utils/check-number';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-staff',
  templateUrl: './edit-staff.component.html',
  styleUrls: ['./edit-staff.component.scss']
})
export class EditStaffComponent implements OnInit {
  public readonly userNameProperty: string = 'userName';
  public readonly firstNameProperty: string = 'firstName';
  public readonly lastNameProperty: string = 'lastName';
  public readonly emailProperty: string = 'email';
  public readonly passwordProperty: string = 'password';

  public readonly birthDateProperty: string = 'birthDate';
  public readonly phoneProperty: string = 'phone';
  public readonly addressStreetProperty: string = 'addressStreet';
  public readonly addressNumberProperty: string = 'addressNumber';
  public readonly addressExtraInfoProperty: string = 'addressExtraInfo';
  public readonly identificationNumberProperty: string = 'identificationNumber';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  cuitMask = [/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];

  constructor(
    private _formBuilder: FormBuilder,
    private _staffService: StaffService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      userName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      firstName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), Validators.email]),

      birthDate: new FormControl<string | undefined>(undefined),
      phone: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      addressStreet: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      addressNumber: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]),
      addressExtraInfo: new FormControl<string | undefined>(undefined),
      identificationNumber: new FormControl<number | undefined>(undefined, [Validators.required, Validators.pattern("^[0-9]{2}-?[0-9]{8}-?[0-9]{1}?$")]),
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 5, 0, 1);
  }

  ngOnInit(): void {
    const staffId = this._activatedRoute.snapshot.paramMap.get('id');

    if (staffId) {
      this.id = Number(staffId);
      this.isEdit = true;

      this.getAndSetFormInfo();
    }
    else
      this.form.addControl('password', new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(6)]))

    this.changeTitle();
  }

  public getNumericError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('max'))
      return "El valor debe ser menor";

    if (control?.hasError('pattern'))
      return "Este campo debe tener un formato valido";

    return "El valor debe ser mayor que 1";
  }

  public getStringError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('pattern'))
      return "Este campo debe tener un formato valido";

    return "El campo debe contener más digitos";
  }

  public getEmailError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('email'))
      return "El campo debe tener un formato de email valido";

    return "El campo debe contener más digitos";
  }

  public save() {
    if (this.isEdit) {
      const dto = this.formToUpdateDto();
      this.update(dto);
    }
    else {
      const dto = this.formToCreateDto();
      this.add(dto);
    }
  }

  private DateChangeCreator(date: Date): string {
    const selectedDate = date.toISOString().split('T')[0];
    return selectedDate;
  }

  get UserName() { return this.form.get(this.userNameProperty); }
  get FirstName() { return this.form.get(this.firstNameProperty); }
  get LastName() { return this.form.get(this.lastNameProperty); }
  get Email() { return this.form.get(this.emailProperty); }
  get Password() { return this.form.get(this.passwordProperty); }

  get BirthDate() { return this.form.get(this.birthDateProperty); }
  get Phone() { return this.form.get(this.phoneProperty); }
  get AddressStreet() { return this.form.get(this.addressStreetProperty); }
  get AddressNumber() { return this.form.get(this.addressNumberProperty); }
  get AddressExtraInfo() { return this.form.get(this.addressExtraInfoProperty); }
  get IdentificationNumber() { return this.form.get(this.identificationNumberProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR STAFF";
    } else {
      this.title = "AGREGAR NUEVO STAFF";
    }
  }

  private formToUpdateDto(): StaffUpdateDto {
    return {
      id: this.id,
      user: {
        userName: this.UserName?.value,
        firstName: this.FirstName?.value,
        lastName: this.LastName?.value,
        email: this.Email?.value,
      },
      personalInfo: {
        birthDate: this.DateChangeCreator(this.BirthDate?.value),
        phone: this.Phone?.value,
        addressStreet: this.AddressStreet?.value,
        addressNumber: this.AddressNumber?.value,
        addressExtraInfo: this.AddressExtraInfo?.value,
        identificationNumber: isNumber(this.IdentificationNumber?.value) ? this.IdentificationNumber?.value : this.IdentificationNumber?.value.replace(/-/g, ""),
      },
    }
  }

  private formToCreateDto(): StaffCreateDto {
    return {
      user: {
        userName: this.UserName?.value,
        firstName: this.FirstName?.value,
        lastName: this.LastName?.value,
        email: this.Email?.value,
        password: this.Password?.value,
      },
      personalInfo: {
        birthDate: this.DateChangeCreator(this.BirthDate?.value),
        phone: this.Phone?.value,
        addressStreet: this.AddressStreet?.value,
        addressNumber: this.AddressNumber?.value,
        addressExtraInfo: this.AddressExtraInfo?.value,
        identificationNumber: this.IdentificationNumber?.value.replace(/-/g, ""),
      },
    }
  }

  private getAndSetFormInfo(): void {
    this._staffService.getOne(this.id)
      .subscribe({
        next: (response: StaffSingleDto) => {
          this.UserName?.setValue(response.user.userName);
          this.FirstName?.setValue(response.user.firstName);
          this.LastName?.setValue(response.user.lastName);
          this.Email?.setValue(response.user.email);

          // This will return an ISO string matching your local time.
          const d = new Date(response.personalInfo.birthDate)
          this.BirthDate?.setValue(new Date(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes() + d.getTimezoneOffset()));

          this.Phone?.setValue(response.personalInfo.phone);
          this.AddressStreet?.setValue(response.personalInfo.addressStreet);
          this.AddressNumber?.setValue(response.personalInfo.addressNumber);
          this.AddressExtraInfo?.setValue(response.personalInfo.addressExtraInfo);
          this.IdentificationNumber?.setValue(response.personalInfo.identificationNumber);
        },
        error: error => {
          this.showError(error);
        },
      });
  }

  private add(dto: StaffCreateDto): void {
    this._staffService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Staff Creado");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private update(dto: StaffUpdateDto): void {
    this._staffService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Staff Actualizado.");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
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
