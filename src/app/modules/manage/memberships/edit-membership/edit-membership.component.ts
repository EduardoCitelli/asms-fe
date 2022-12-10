import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { MembershipTypeService } from 'src/app/core/services/membership-type.service';
import { MembershipService } from 'src/app/core/services/membership.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { MembershipCreateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-create-dto';
import { MembershipSingleDto } from 'src/app/shared/interfaces/dtos/memberships/membership-single-dto';
import { MembershipUpdateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-update-dto';

@Component({
  selector: 'app-edit-membership',
  templateUrl: './edit-membership.component.html',
  styleUrls: ['./edit-membership.component.css']
})
export class EditMembershipComponent implements OnInit {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly isPremiumProperty: string = 'isPremium';
  public readonly membershipTypeIdProperty: string = 'membershipTypeId';
  public readonly priceProperty: string = 'price';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  typeDtos: ComboDto<number>[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _membershipService: MembershipService,
    private _membershipTypeService: MembershipTypeService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      name: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      isPremium: [false],
      membershipTypeId: new FormControl<ComboDto<number> | undefined>(undefined, Validators.required),
      price: new FormControl<number | undefined>(undefined, Validators.compose([Validators.required, Validators.min(1)])),
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
      this.title = "EDITAR MEMBRESIA";
    } else {
      this.title = "AGREGAR NUEVA MEMBRESIA";
    }
  }

  private formToDto(): MembershipSingleDto {
    return {
      id: this.id,
      name: this.Name?.value,
      description: this.Description?.value,
      isPremium: this.IsPremium?.value,
      membershipTypeId: this.MembershipTypeId?.value,
      price: this.Price?.value,
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

  private add(dto: MembershipCreateDto): void {
    this._membershipService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Membresia Creada");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
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
