import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { InstituteClassBlockService } from 'src/app/core/services/institute-class-block.service';
import { InstituteClassBlockCalendarDto } from '../../interfaces/dtos/institute-class-blocks/institute-class-block-calendar-dto';
import { ToastrService } from 'ngx-toastr';
import { InstituteMemberService } from 'src/app/core/services/institute-member.service';
import { catchError, tap } from 'rxjs';
import { ComboDto } from '../../interfaces/combo-dto';

@Component({
  selector: 'app-manage-class-block-modal',
  templateUrl: './manage-class-block-modal.component.html',
  styleUrls: ['./manage-class-block-modal.component.scss']
})
export class ManageClassBlockModalComponent {
  instituteMembersCombos: ComboDto<number>[] = [];
  selectedInstituteMembers: number[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public model: InstituteClassBlockCalendarDto,
    private _service: InstituteClassBlockService,
    private _instituteMemberService: InstituteMemberService,
    private _dialogRef: MatDialogRef<ManageClassBlockModalComponent>,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {
    this.selectedInstituteMembers = this.model.memberIds;
    this.initializeInstituteMembersCombos();
  }

  isOptionDisabled(id: number) {
    if (!!!this.selectedInstituteMembers) {
      return false;
    }

    return this.selectedInstituteMembers.length >= this.model.roomCapacity && !this.selectedInstituteMembers.find((memberId: number) => memberId == id)
  }

  saveChanges() {
    this._service.updateMembers(this.model.id, this.selectedInstituteMembers)
      .pipe(
        tap(() => {
          this.showSuccess('Clase actualizada');
          this._dialogRef.close(true);
        }),
        catchError(error => {
          this.showError(error);
          return error;
        })
      ).subscribe();
  }

  private initializeInstituteMembersCombos() {
    this._instituteMemberService.combo(this.model.activityId).pipe(
      tap(comboList => {
        this.instituteMembersCombos = comboList;
      }),
      catchError(error => {
        this.showError("Error obteniendo miembros");
        return error;
      })
    ).subscribe();
  }

  private showSuccess(message: string) {
    this._toastrService.success(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }
}
