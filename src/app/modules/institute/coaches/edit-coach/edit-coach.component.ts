import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { CoachesService } from 'src/app/core/services/coaches.service';
import { CoachCreateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-create-dto';
import { CoachSingleDto } from 'src/app/shared/interfaces/dtos/coaches/coach-single-dto';
import { CoachUpdateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-update-dto';
import { isNumber } from 'src/app/shared/utils/check-number';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit {
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
  public readonly salaryProperty: string = 'salary';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  cuitMask = [/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];

  constructor(
    private _formBuilder: FormBuilder,
    private _coachesService: CoachesService,
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

      salary: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]),
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 5, 0, 1);
  }

  ngOnInit(): void {
    const coachId = this._activatedRoute.snapshot.paramMap.get('id');

    if (coachId) {
      this.id = Number(coachId);
      this.isEdit = true;

      this.getAndSetFormInfo();
    }
    else
      this.form.addControl('password', new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(7)]))

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

  get Salary() { return this.form.get(this.salaryProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR PROFESOR";
    } else {
      this.title = "AGREGAR NUEVO PROFESOR";
    }
  }

  private formToUpdateDto(): CoachUpdateDto {
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
      salary: this.Salary?.value,
    }
  }

  private formToCreateDto(): CoachCreateDto {
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
      salary: this.Salary?.value,
    }
  }

  private getAndSetFormInfo(): void {
    this._coachesService.getOne(this.id)
      .subscribe({
        next: (response: CoachSingleDto) => {
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

          this.Salary?.setValue(response.salary);
        },
        error: error => {
          this.showError(error);
        },
      });
  }

  private add(dto: CoachCreateDto): void {
    this._coachesService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Profesor Creado");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private update(dto: CoachUpdateDto): void {
    this._coachesService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Profesor Actualizado.");
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
