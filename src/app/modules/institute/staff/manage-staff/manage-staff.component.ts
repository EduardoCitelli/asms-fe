import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { StaffService } from 'src/app/core/services/staff.service';
import { StaffListDto } from 'src/app/shared/interfaces/dtos/staff/staff-list-dto';

@Component({
  selector: 'app-manage-staff',
  templateUrl: './manage-staff.component.html',
  styleUrls: ['./manage-staff.component.css']
})
export class ManageStaffComponent {
  public title: string = "Staff"
  displayedColumns: string[] = [
    "fullName",
    "phone",
    "option",
  ];

  dataSource: StaffListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _coachesService: StaffService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadStaff(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadStaffPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institute/staff/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/staff/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar el personal?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteStaff(id);
      });
  }

  private deleteStaff(id: number) {
    this._coachesService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.dataCount -= 1;
        this._toastrService.success("Personal Eliminado");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadStaffPage() {
    this.loadStaff(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadStaff(pageIndex: number, pageSize: number) {
    this._coachesService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo el personal.");
        return throwError(error);
      })
    ).subscribe();
  }
}
