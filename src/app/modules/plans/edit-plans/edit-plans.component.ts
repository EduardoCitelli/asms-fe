import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { PlansService } from 'src/app/core/services/plans.service';
import { PlanCreateDto } from 'src/app/shared/interfaces/dtos/plans/plan-create-dto';
import { PlanSingleDto } from 'src/app/shared/interfaces/dtos/plans/plan-single-dto';
import { PlanUpdateDto } from 'src/app/shared/interfaces/dtos/plans/plan-update-dto';

@Component({
  selector: 'app-edit-plans',
  templateUrl: './edit-plans.component.html',
  styleUrls: ['./edit-plans.component.scss']
})
export class EditPlansComponent {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly allowedUsersProperty: string = 'allowedUsers';
  public readonly priceProperty: string = 'price';
  public readonly hasOnlineClassesProperty: string = 'hasOnlineClasses';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  planForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _planService: PlansService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.planForm = this._formBuilder.group({
      name: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      description: new FormControl<string | undefined>(undefined, Validators.compose([Validators.required, Validators.minLength(3)])),
      allowedUsers: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]),
      price: new FormControl<number | undefined>(undefined, [Validators.required, Validators.min(1)]),
      hasOnlineClasses: [false],
    });
  }

  ngOnInit(): void {
    const planId = this._activatedRoute.snapshot.paramMap.get('id');

    if (planId) {
      this.id = Number(planId);
      this.isEdit = true;

      this.getAndSetPlanInfo();
    }

    this.changeTitle();
  }

  public save() {
    const dto = this.formToDto();

    if (this.isEdit)
      this.updatePlan(dto);
    else
      this.addPlan(dto);
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

  get Name() { return this.planForm.get(this.nameProperty); }
  get Description() { return this.planForm.get(this.descriptionProperty); }
  get AllowedUsers() { return this.planForm.get(this.allowedUsersProperty); }
  get Price() { return this.planForm.get(this.priceProperty); }
  get HasOnlineClasses() { return this.planForm.get(this.hasOnlineClassesProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR PLAN";
    } else {
      this.title = "AGREGAR NUEVO PLAN";
    }
  }

  private formToDto(): PlanSingleDto {
    return {
      id: this.id,
      name: this.Name?.value,
      description: this.Description?.value,
      allowedUsers: this.AllowedUsers?.value,
      price: this.Price?.value,
      hasOnlineClasses: this.HasOnlineClasses?.value,
    }
  }

  private getAndSetPlanInfo(): void {
    this._planService.getPlan(this.id).subscribe(plan => {
      this.Name?.setValue(plan.name);
      this.Description?.setValue(plan.description);
      this.AllowedUsers?.setValue(plan.allowedUsers);
      this.Price?.setValue(plan.price);
      this.HasOnlineClasses?.setValue(plan.hasOnlineClasses);
    },
      error => {
        this.showError(error);
      });
  }

  private addPlan(dto: PlanCreateDto): void {
    this._planService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Plan Creado");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private updatePlan(dto: PlanUpdateDto): void {
    this._planService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Plan Actualizado.");
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
