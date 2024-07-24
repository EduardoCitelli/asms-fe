import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { InstitutePlanService } from 'src/app/core/services/institute-plan.service';
import { PlansService } from 'src/app/core/services/plans.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { InstituteListDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-list-dto';
import { InstitutePlanCreateDto } from 'src/app/shared/interfaces/dtos/institute-plans/institute-plan-create-dto';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-set-institute-plan-dialog',
  templateUrl: './set-institute-plan-dialog.component.html',
  styleUrls: ['./set-institute-plan-dialog.component.scss']
})
export class SetInstitutePlanDialogComponent {
  instituteModel: InstituteListDto;
  plans: ComboDto<number>[] = [];
  selectedPlan: ComboDto<number>[] = [];

  constructor(
    private dialog: MatDialogRef<SetInstitutePlanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public model: InstituteListDto,
    private _plansService: PlansService,
    private _institutePlanService: InstitutePlanService,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {
    this.instituteModel = model;
    this.getAndSetPlans();
  }

  saveChanges() {
    const request: InstitutePlanCreateDto = {
      planId: this.selectedPlan[0].id,
      instituteId: this.model.id,
    };

    this.openConfirmDialog(request);
  }

  private getAndSetPlans() {
    this._plansService.getCombo().pipe(
      tap(combos => {
        this.plans = combos;
      })
    ).subscribe();
  }

  private openConfirmDialog(dto: InstitutePlanCreateDto) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea actualizar el plan de la institución?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.updateInstitutePlan(dto);
        }
      });
  }

  private updateInstitutePlan(dto: InstitutePlanCreateDto) {
    this._institutePlanService.create(dto)
      .pipe(untilDestroyed(this),
        tap(response => {
          if (!response)
            this._toastrService.error('Error actualizando plan de institución');
          else {
            this._toastrService.success('Plan de institución actualizado correctamente');
            this.dialog.close(true);
          }
        }),
        catchError(error => {
          this._toastrService.error(error);
          return error;
        })
      ).subscribe();
  }

}
