import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { InstituteService } from 'src/app/core/services/institute.service';
import { InstituteSingleDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-single-dto';
import { InstituteUpdateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-update-dto';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-my-institute',
  templateUrl: './my-institute.component.html',
  styleUrls: ['./my-institute.component.css']
})
export class MyInstituteComponent implements OnInit {
  public readonly institutionNameProperty: string = 'institutionName';

  public readonly birthDateProperty: string = 'birthDate';
  public readonly phoneProperty: string = 'phone';
  public readonly addressStreetProperty: string = 'addressStreet';
  public readonly addressNumberProperty: string = 'addressNumber';
  public readonly addressExtraInfoProperty: string = 'addressExtraInfo';
  public readonly identificationNumberProperty: string = 'identificationNumber';

  title: string = "Gestionar Datos Institución";
  form: FormGroup;
  minDate: Date;
  maxDate: Date;
  cuitMask = [/\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, "-", /\d/];

  constructor(
    private _formBuilder: FormBuilder,
    private _instituteService: InstituteService,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      institutionName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      birthDate: new FormControl<string | undefined>(undefined),
      phone: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]),
      addressStreet: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      addressNumber: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]),
      addressExtraInfo: new FormControl<string | undefined>(undefined),
      identificationNumber: new FormControl<number | undefined>(undefined, [Validators.required]),
    });

    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 100, 0, 1);
    this.maxDate = new Date(currentYear - 5, 0, 1);
  }

  ngOnInit(): void {
    this.getAndSetFormInfo();
  }

  get InstitutionName() { return this.form.get(this.institutionNameProperty); }
  get BirthDate() { return this.form.get(this.birthDateProperty); }
  get Phone() { return this.form.get(this.phoneProperty); }
  get AddressStreet() { return this.form.get(this.addressStreetProperty); }
  get AddressNumber() { return this.form.get(this.addressNumberProperty); }
  get AddressExtraInfo() { return this.form.get(this.addressExtraInfoProperty); }
  get IdentificationNumber() { return this.form.get(this.identificationNumberProperty); }

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

  public save() {
    const dto = this.formToUpdateDto();
    this.update(dto);
  }

  private update(dto: InstituteUpdateDto): void {
    this._instituteService.updateMine(dto).pipe(
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

  private formToUpdateDto(): InstituteUpdateDto {
    return {
      institutionName: this.InstitutionName?.value,
      personalInfo: {
        birthDate: this.DateChangeCreator(this.BirthDate?.value),
        phone: this.Phone?.value,
        addressStreet: this.AddressStreet?.value,
        addressNumber: this.AddressNumber?.value,
        addressExtraInfo: this.AddressExtraInfo?.value,
        identificationNumber: this.IdentificationNumber?.value,
      },
    }
  }

  private DateChangeCreator(date: Date): string {
    const selectedDate = date.toISOString().split('T')[0];
    return selectedDate;
  }

  private getAndSetFormInfo(): void {
    this._instituteService.getMine()
      .subscribe({
        next: (response: InstituteSingleDto) => {
          // This will return an ISO string matching your local time.
          console.log(response.personalInfo.identificationNumber)
          this.InstitutionName?.setValue(response.institutionName);

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
