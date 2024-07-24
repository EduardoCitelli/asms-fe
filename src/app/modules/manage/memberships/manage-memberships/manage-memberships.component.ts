import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MembershipService } from 'src/app/core/services/membership.service';
import { MembershipListDto } from 'src/app/shared/interfaces/dtos/memberships/membership-list-dto';

@Component({
  selector: 'app-manage-memberships',
  templateUrl: './manage-memberships.component.html',
  styleUrls: ['./manage-memberships.component.scss']
})
export class ManageMembershipsComponent {
  public title: string = "Membresías"
  displayedColumns: string[] = [
    "name",
    "description",
    "option",
  ];

  dataSource: MembershipListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _membershipTypeService: MembershipService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadMemberships(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadMembershipPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['manage/memberships/add']);
  }

  public edit(id: number) {
    this._router.navigate(['manage/memberships/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar la membresia?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteMembership(id);
      });
  }

  private deleteMembership(id: number) {
    this._membershipTypeService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.dataCount -= 1;
        this._toastrService.success("Membresia Eliminada");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadMembershipPage() {
    this.loadMemberships(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadMemberships(pageIndex: number, pageSize: number) {
    this._membershipTypeService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo las membresias.");
        return throwError(error);
      })
    ).subscribe();
  }
}
