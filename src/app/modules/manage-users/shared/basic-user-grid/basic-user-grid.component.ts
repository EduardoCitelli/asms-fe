import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { UsersService } from 'src/app/core/services/users.service';
import { UserListDto } from 'src/app/shared/interfaces/dtos/users/user-list-dto';
import { RolesShelfComponent } from '../../user-roles/roles-shelf/roles-shelf.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-basic-user-grid',
  templateUrl: './basic-user-grid.component.html',
  styleUrls: ['./basic-user-grid.component.scss']
})
export class BasicUserGridComponent implements AfterViewInit {
  public title: string = 'Usuarios';

  @Input() public isManageUser: boolean = true;

  displayedColumns: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'isEmailConfirmed',
    'isBlocked',
    'option'
  ]

  displayedColumnsForRoles: string[] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'option'
  ]

  dataSource: UserListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _userService: UsersService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {
    this.loadUsers(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadUsersPage())
      )
      .subscribe();
  }

  public edit(id: number) {
    this._router.navigate(['manage-users/users/edit', id]);
  }

  public editRoles(user: UserListDto) {
    this._dialog.open(RolesShelfComponent, {
      width: '40rem',
      data: {
        id: user.id,
        name: user.userName,
      }
    }).afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(confirmed => {
        if (confirmed) {
          this.loadUsers(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
        }
      });
  }

  public block(entity: UserListDto) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea bloquear al usuario?',
    })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(confirmed => {
        if (confirmed)
          this.blockUnblockUser(entity.id, true);
        else
          entity.isBlocked = false;
      });
  }

  public unblock(entity: UserListDto) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea desbloquear al usuario?',
    })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(confirmed => {
        if (confirmed)
          this.blockUnblockUser(entity.id, false);
        else
          entity.isBlocked = true;
      });
  }

  private blockUnblockUser(id: number, isBlocked: boolean) {
    this._userService.blockUnblockUser(id, isBlocked)
      .pipe(untilDestroyed(this),
        tap(response => {
          if (!response) {
            const action = isBlocked ? 'bloqueando' : 'desbloqueando';
            this._toastrService.error(`Error ${action} usuario`);
          }
        }),
        catchError(error => {
          const action = isBlocked ? 'bloqueando' : 'desbloqueando';
          this._toastrService.error(`Error ${action} usuario`);
          return throwError(error);
        })
      ).subscribe();
  }

  private loadUsersPage() {
    this.loadUsers(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadUsers(pageIndex: number, pageSize: number) {
    this._userService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo usuarios.");
        return throwError(error);
      })
    ).subscribe();
  }
}
