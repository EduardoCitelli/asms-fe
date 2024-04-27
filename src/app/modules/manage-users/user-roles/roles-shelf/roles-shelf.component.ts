import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { RolesService } from 'src/app/core/services/roles.service';
import { UsersService } from 'src/app/core/services/users.service';
import { RoleListDto } from 'src/app/shared/interfaces/dtos/roles/role-list-dto';
import { RoleTypeEnum } from 'src/app/shared/interfaces/enums/role-type-enum';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-roles-shelf',
  templateUrl: './roles-shelf.component.html',
  styleUrls: ['./roles-shelf.component.css']
})
export class RolesShelfComponent {
  user: { id: number, name: string }
  roles: RoleViewModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, name: string },
    private _userService: UsersService,
    private _roleService: RolesService,
    private _myDialog: MatDialogRef<RolesShelfComponent>,
    private _dialog: MatDialog,
    private _toastrService: ToastrService,
  ) {
    this.user = data;

    this.getUserRoles();
  }

  public saveChanges() {
    const ids = this.roles.filter(x => x.checked == true).map(x => x.id);
    this.openConfirmDialog(ids);
  }

  private openConfirmDialog(ids: RoleTypeEnum[]) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea actualizar los roles del usuario?',
    })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(confirmed => {
        if (confirmed) {
          this.updateUserRoles(ids);
        }
      });
  }

  private getUserRoles() {
    this._userService.getUserRoles(this.user.id).subscribe(selectedRoles => {
      this._roleService.getAll(1, 10).subscribe(response => {
        this.roles = response.items.map(x => {
          return {
            ...x,
            checked: selectedRoles.includes(x.id),
          };
        });
      });
    });
  }



  private updateUserRoles(ids: RoleTypeEnum[]) {
    this._userService.updateUserRoles(this.user.id, ids)
      .pipe(untilDestroyed(this),
        tap(response => {
          console.log(response)
          if (!response)
            this._toastrService.error('Error actualizando roles de usuario');
          else {

            this._toastrService.success('Roles de usuario actualizados correctamente');
            this._myDialog.close(true);
          }
        }),
        catchError(error => {
          this._toastrService.error('Error actualizando roles de usuario');
          return throwError(error);
        })
      ).subscribe();
  }
}

interface RoleViewModel extends RoleListDto {
  checked: boolean;
}
