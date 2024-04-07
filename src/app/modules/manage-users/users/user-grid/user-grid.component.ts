import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { UsersService } from 'src/app/core/services/users.service';
import { UserListDto } from 'src/app/shared/interfaces/dtos/users/user-list-dto';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements AfterViewInit {
  public title: string = 'Usuarios';
  displayedColumns: string [] = [
    'userName',
    'firstName',
    'lastName',
    'email',
    'isEmailConfirmed',
    'isBlocked',
    'option'
  ]

  dataSource: UserListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor (
    private _userService: UsersService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ){
    this.loadUsers(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadUsersPage())
      )
      .subscribe();
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
