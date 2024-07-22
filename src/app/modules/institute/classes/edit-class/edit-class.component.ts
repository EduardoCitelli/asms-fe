import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, tap } from 'rxjs';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { CoachesService } from 'src/app/core/services/coaches.service';
import { InstituteClassService } from 'src/app/core/services/institute-class.service';
import { RoomsService } from 'src/app/core/services/rooms.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { InstituteClassSingleDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-single-dto';
import { DayOfWeek } from 'src/app/shared/interfaces/enums/day-of-week.enum';
import { differentValueValidation } from 'src/app/shared/utils/validators/different-value-validation';
import { getControlError } from 'src/app/shared/utils/validators/get-input-errors';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.css']
})
export class EditClassComponent implements OnInit {
  id: number = 0;
  isEdit: boolean = false;
  title: string = "";
  recurrenceTitle: string = "Clase no recurrente";
  formGroup: FormGroup;

  activityCombo: ComboDto<number>[] = [];
  coachCombo: ComboDto<number>[] = [];
  roomCombo: ComboDto<number>[] = [];
  daysOfWeek: DayOfWeek[] = [];
  posibleMinutes: number[] = [];

  maxMinutes: number = 180;
  minDate: Date = new Date();
  maxDate: Date = new Date(this.minDate.getFullYear() + 5, 0, 1);

  principalCoachIdControl: FormControl = new FormControl(undefined, [Validators.required, Validators.min(1)]);
  auxCoachIdControl: FormControl = new FormControl(undefined, [Validators.min(1), differentValueValidation(this.principalCoachIdControl, 'Entrenador titular')]);
  roomIdControl: FormControl = new FormControl(undefined, [Validators.required, Validators.min(1)]);
  descriptionControl: FormControl = new FormControl(undefined, [Validators.required, Validators.minLength(3)]);
  startTimeControl: FormControl = new FormControl(undefined, [Validators.required]);
  minutesDurationControl: FormControl = new FormControl(undefined, [Validators.required, Validators.min(30)]);

  activityIdControl: FormControl = new FormControl(undefined, [Validators.required, Validators.min(1)]);
  isRecurrenceControl: FormControl = new FormControl(false, [Validators.required]);
  notRecurrenceDateControl: FormControl = new FormControl(undefined, [Validators.required]);
  fromRangeControl: FormControl = new FormControl(undefined, [Validators.required]);
  toRangeControl: FormControl = new FormControl(undefined, [Validators.required]);
  daysOfWeekControl: FormControl = new FormControl(undefined, [Validators.required]);

  constructor(
    private _service: InstituteClassService,
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _toastrService: ToastrService,
    private _coachService: CoachesService,
    private _activityService: ActivitiesService,
    private _roomService: RoomsService,
    private _datePipe: DatePipe,
  ) {
    this.formGroup = this._formBuilder.group({
      principalCoachId: this.principalCoachIdControl,
      auxCoachId: this.auxCoachIdControl,
      roomId: this.roomIdControl,
      description: this.descriptionControl,
      startTime: this.startTimeControl,
      minutesDuration: this.minutesDurationControl,

      activityId: this.activityIdControl,
      isRecurrence: this.isRecurrenceControl,
      notRecurrenceDate: this.notRecurrenceDateControl,
      fromRange: this.fromRangeControl,
      toRange: this.toRangeControl,
      daysOfWeek: this.daysOfWeekControl,
    });

    let options = Object.values(DayOfWeek) as DayOfWeek[];
    this.daysOfWeek = options.slice(options.length / 2);

    for (let i = 15; i <= this.maxMinutes; i += 15) {
      this.posibleMinutes.push(i);
    }
  }

  ngOnInit(): void {
    const id = this._activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.id = Number(id);
      this.isEdit = true;
      this.getAndSetUpdateInfo();
    }
    else
      this.changeValidations(false);


    this.changeTitle();
    this.getCombos();
  }

  save() {
    const dto = this.formToDto();
    this.handleCreateUpdateData(dto);
  }

  getError(controlErrors: ValidationErrors | null) {
    return getControlError(controlErrors);
  }

  getDayOfWeekName(day: DayOfWeek) {
    return DayOfWeek[day]
  }

  handleRecurrence(change: MatCheckboxChange) {
    this.changeRecurrenceTitle(change.checked);
    this.changeValidations(change.checked);
  }

  private changeTitle(): void {
    if (this.isEdit) {
      this.title = "EDITAR CLASE";
    } else {
      this.title = "AGREGAR NUEVA CLASE";
    }
  }

  private changeRecurrenceTitle(isRecurrence: boolean) {
    if (isRecurrence) {
      this.recurrenceTitle = "Clase recurrente";
    } else {
      this.recurrenceTitle = "Clase no recurrente";
    }
  }

  private changeValidations(isRecurrence: boolean) {
    if (isRecurrence) {
      this.addRecurrenceClassValidators();
      this.removeNotRecurrenceClassValidators();
    }
    else {
      this.addNotRecurrenceClassValidators();
      this.removeRecurrenceClassValidators();
    }
  }

  private removeRecurrenceClassValidators() {
    this.removeRequiredValidator(this.fromRangeControl);
    this.removeRequiredValidator(this.toRangeControl);
    this.removeRequiredValidator(this.daysOfWeekControl);
  }

  private removeNotRecurrenceClassValidators() {
    this.removeRequiredValidator(this.notRecurrenceDateControl);
  }

  private addRecurrenceClassValidators() {
    this.addRequiredValidator(this.fromRangeControl);
    this.addRequiredValidator(this.toRangeControl);
    this.addRequiredValidator(this.daysOfWeekControl);
  }

  private addNotRecurrenceClassValidators() {
    this.addRequiredValidator(this.notRecurrenceDateControl);
  }

  private addRequiredValidator(control: FormControl) {
    control.addValidators([Validators.required]);
  }

  private removeRequiredValidator(control: FormControl) {
    control.clearValidators();
    control.reset();
  }

  private getCombos(): void {
    this._coachService.getCombo().pipe(
      tap(comboList => this.coachCombo = comboList)
    ).subscribe();

    this._roomService.getCombo().pipe(
      tap(comboList => this.roomCombo = comboList)
    ).subscribe();

    if (!this.isEdit) {
      this._activityService.getCombo().pipe(
        tap(comboList => this.activityCombo = comboList)
      ).subscribe();
    }
  }

  private getAndSetUpdateInfo(): void {
    this.removeControlsForCreate();

    this._service.getOne(this.id).pipe(
      tap(response => {
        this.descriptionControl.setValue(response.description);
        this.principalCoachIdControl.setValue(response.principalCoachId);
        this.roomIdControl.setValue(response.roomId);
        this.auxCoachIdControl.setValue(response.auxCoachId);
        this.startTimeControl.setValue(response.startTime);
        this.minutesDurationControl.setValue(response.minutesDuration);
      }),
      catchError(error => {
        this.showError(error);
        return error;
      })
    ).subscribe();
  }

  private removeControlsForCreate() {
    this.removeControls(this.activityIdControl);
    this.removeControls(this.isRecurrenceControl);
    this.removeControls(this.notRecurrenceDateControl);
    this.removeControls(this.fromRangeControl);
    this.removeControls(this.toRangeControl);
    this.removeControls(this.daysOfWeekControl);
  }

  private removeControls(control: FormControl) {
    control.clearValidators();
    control.reset();
  }

  private formToDto(): InstituteClassSingleDto {
    return {
      id: this.id,
      principalCoachId: this.principalCoachIdControl.value,
      auxCoachId: this.auxCoachIdControl.value,

      roomId: this.roomIdControl.value,
      description: this.descriptionControl.value,

      startTime: this.startTimeControl.value,
      minutesDuration: this.minutesDurationControl.value,

      activityId: this.activityIdControl.value,

      isRecurrence: this.isRecurrenceControl.value,

      notRecurrenceDate: this.dateChangeCreator(this.notRecurrenceDateControl.value),

      fromRange: this.dateChangeCreator(this.fromRangeControl.value),
      toRange: this.dateChangeCreator(this.toRangeControl.value),
      daysOfWeek: this.daysOfWeekControl.value,
    };
  }

  private handleCreateUpdateData(dto: InstituteClassSingleDto) {
    const action = this.isEdit ? this._service.update(dto, this.id) : this._service.create(dto);
    const successMessage = this.isEdit ? 'actualizada' : 'creada';

    this.callSaveMethod(action, successMessage);
  }

  private callSaveMethod(action: Observable<InstituteClassSingleDto>, successMessage: string) {
    action.pipe(
      tap(() => {
        this.showSuccess(`Clase ${successMessage} correctamente.`);
        this.goBack();
      }),
      catchError(error => {
        this.showError(error);
        return error;
      })
    ).subscribe();
  }

  private dateChangeCreator(date: Date): string {
    const selectedDate = this._datePipe.transform(date, "YYYY-MM-dd");
    return selectedDate!;
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
