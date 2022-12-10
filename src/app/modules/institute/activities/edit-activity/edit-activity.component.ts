import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { ActivityCreateDto } from 'src/app/shared/interfaces/dtos/activities/activity-create-dto';
import { ActivitySingleDto } from 'src/app/shared/interfaces/dtos/activities/activity-single-dto';
import { ActivityUpdateDto } from 'src/app/shared/interfaces/dtos/activities/activity-update-dto';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.component.html',
  styleUrls: ['./edit-activity.component.css']
})
export class EditActivityComponent implements OnInit {
  public readonly nameProperty: string = 'name';
  public readonly descriptionProperty: string = 'description';
  public readonly memberMinQuantityProperty: string = 'memberMinQuantity';

  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  activityForm: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _activityService: ActivitiesService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
  ) {
    this.activityForm = this._formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      description: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      memberMinQuantity: [undefined],
    });
  }

  ngOnInit(): void {
    const activityId = this._activatedRoute.snapshot.paramMap.get('id');

    if (activityId) {
      this.id = Number(activityId);
      this.isEdit = true;

      this.getAndSetActivityInfo();
    }

    this.changeTitle();
  }

  public save() {
    const dto = this.formToDto();

    if (this.isEdit)
      this.updateActivity(dto);
    else
      this.addActivity(dto);
  }

  get Name() { return this.activityForm.get(this.nameProperty); }
  get Description() { return this.activityForm.get(this.descriptionProperty); }
  get MemberMinQuantity() { return this.activityForm.get(this.memberMinQuantityProperty); }

  private changeTitle() {
    if (this.isEdit) {
      this.title = "EDITAR ACTIVIDAD";
    } else {
      this.title = "AGREGAR NUEVA ACTIVIDAD";
    }
  }

  private formToDto(): ActivitySingleDto {
    return {
      id: this.id,
      name: this.Name?.value,
      description: this.Description?.value,
      memberMinQuantity: this.MemberMinQuantity?.value,
    }
  }

  private getAndSetActivityInfo(): void {
    this._activityService.getActivity(this.id).subscribe(activity => {
      this.Name?.setValue(activity.name);
      this.Description?.setValue(activity.description);
      this.MemberMinQuantity?.setValue(activity.memberMinQuantity);
    },
      error => {
        this.showError(error);
      });
  }

  private addActivity(dto: ActivityCreateDto): void {
    this._activityService.create(dto).pipe(
      tap(() => {
        this.showSuccess("Actividad Creada");
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private updateActivity(dto: ActivityUpdateDto): void {
    this._activityService.update(dto).pipe(
      tap(() => {
        this.showSuccess("Actividad Actualizada.");
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
