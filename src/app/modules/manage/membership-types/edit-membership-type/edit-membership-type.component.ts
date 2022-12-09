import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { MembershipTypeService } from 'src/app/core/services/membership-type.service';
import { MembershipTypeCreateDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-create-dto';
import { MembershipTypeSingleDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-single-dto';
import { MembershipTypeUpdateDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-update-dto';

@Component({
  selector: 'app-edit-membership-type',
  templateUrl: './edit-membership-type.component.html',
  styleUrls: ['./edit-membership-type.component.css']
})
export class EditMembershipTypeComponent implements OnInit {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly isByQuantityProperty: string = 'isByQuantity';
  public readonly monthQuantityProperty: string = 'monthQuantity';
  public readonly classQuantityProperty: string = 'classQuantity';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  form: FormGroup;
  isByQuantityChecked: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _membershipTypeService: MembershipTypeService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      isByQuantity: [false],
      monthQuantity: [undefined, Validators.compose([Validators.required, Validators.min(1)])],
      classQuantity: [undefined],
    });
  }

  ngOnInit(): void {
    const membershipTypeId = this._activatedRoute.snapshot.paramMap.get('id');

    if (membershipTypeId) {
      this.id = Number(membershipTypeId);
      this.isEdit = true;

      this.getAndSetFormInfo();
    }

    this.changeTitle();
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
  get IsByQuantity() { return this.form.get(this.isByQuantityProperty); }
  get MonthQuantity() { return this.form.get(this.monthQuantityProperty); }
  get ClassQuantity() { return this.form.get(this.classQuantityProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR TIPO DE MEMBRESIA";
    } else {
      this.title = "AGREGAR NUEVO TIPO DE MEMBRESIA";
    }
  }

  private formToDto(): MembershipTypeSingleDto {
    return {
      id: this.id,
      name: this.Name?.value,
      description: this.Description?.value,
      isByQuantity: this.IsByQuantity?.value,
      monthQuantity: this.MonthQuantity?.value,
      classQuantity: this.ClassQuantity?.value,
    }
  }

  private getAndSetFormInfo(): void {
    this._membershipTypeService.getOne(this.id)
      .subscribe(response => {
        this.Name?.setValue(response.name);
        this.Description?.setValue(response.description);
        this.IsByQuantity?.setValue(response.isByQuantity);
        this.MonthQuantity?.setValue(response.monthQuantity);
        this.ClassQuantity?.setValue(response.classQuantity);
      },
        error => {
          this.showError(error);
        });
  }

  private add(dto: MembershipTypeCreateDto): void {
    this._membershipTypeService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Tipo de membresia Creada");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private update(dto: MembershipTypeUpdateDto): void {
    this._membershipTypeService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Tipo de membresia Actualizada.");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private showSuccess(message: string) {
    this._toastrService.info(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }

  private goBack() {
    this._location.back();
  }
}
