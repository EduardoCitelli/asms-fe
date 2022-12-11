import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { CoachesService } from 'src/app/core/services/coaches.service';
import { CoachCreateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-create-dto';
import { CoachSingleDto } from 'src/app/shared/interfaces/dtos/coaches/coach-single-dto';
import { CoachUpdateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-update-dto';

@Component({
  selector: 'app-edit-coach',
  templateUrl: './edit-coach.component.html',
  styleUrls: ['./edit-coach.component.css']
})
export class EditCoachComponent implements OnInit  {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly isPremiumProperty: string = 'isPremium';
  public readonly membershipTypeIdProperty: string = 'membershipTypeId';
  public readonly priceProperty: string = 'price';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _coachesService: CoachesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      fullName: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      phone: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      isPremium: [false],
      price: new FormControl<number | undefined>(undefined, Validators.compose([Validators.required, Validators.min(1)])),
    });
  }

  ngOnInit(): void {
    const membershipId = this._activatedRoute.snapshot.paramMap.get('id');

    if (membershipId) {
      this.id = Number(membershipId);
      this.isEdit = true;

      this.getAndSetFormInfo();
    }

    this.changeTitle();
  }

  public getNumericError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    return "El valor debe ser mayor que 1";
  }

  public getStringError(control : AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    return "El campo debe contener más de 3 digitos";
  }

  public save() {
    const dto = this.formToDto();

    if (this.isEdit)
      this.update(dto);
    else
      this.add(dto);
  }

  get Name() { return this.form.get(this.nameProperty); }
  get Description() { return this.form.get(this.descriptionProperty); }
  get IsPremium() { return this.form.get(this.isPremiumProperty); }
  get MembershipTypeId() { return this.form.get(this.membershipTypeIdProperty); }
  get Price() { return this.form.get(this.priceProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR PROFESOR";
    } else {
      this.title = "AGREGAR NUEVO PROFESOR";
    }
  }

  private formToDto(): CoachSingleDto {
    return {
      id: this.id,
      user: {
        userName: '',
        firstName: "",
        lastName: '',
        email: '',
      },
      personalInfo: {
        birthDate: '',
        phone: '',
        addressStreet: '',
        addressNumber: 1,
        addressExtraInfo: '',
        identificationNumber: 1,
      },
      salary: 1,
    }
  }

  private getAndSetFormInfo(): void {
    this._coachesService.getOne(this.id)
      .subscribe(response => {
        this.Name?.setValue(response.name);
        this.Description?.setValue(response.description);
        this.IsPremium?.setValue(response.isPremium);
        this.MembershipTypeId?.setValue(response.membershipTypeId);
        this.Price?.setValue(response.price);
      },
        error => {
          this.showError(error);
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
