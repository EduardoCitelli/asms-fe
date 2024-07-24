import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { MembershipTypeService } from 'src/app/core/services/membership-type.service';
import { MembershipTypeListDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-list-dto';

@Component({
  selector: 'app-manage-membership-types',
  templateUrl: './manage-membership-types.component.html',
  styleUrls: ['./manage-membership-types.component.scss']
})
export class ManageMembershipTypesComponent {
  public title: string = 'Tipos de membresias';
  displayedColumns: string[] = [
    "name",
    "description",
    "option",
  ];

  dataSource: MembershipTypeListDto[] = [];
  typesCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _membershipTypeService: MembershipTypeService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadMembershipTypes(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadMembershipTypePage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['manage/membership-types/add']);
  }

  public edit(id: number) {
    this._router.navigate(['manage/membership-types/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar el tipo de membresia?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteMembershipType(id);
      });
  }

  private deleteMembershipType(id: number) {
    this._membershipTypeService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.typesCount -= 1;
        this._toastrService.success("Tipo de membresia Eliminada");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadMembershipTypePage() {
    this.loadMembershipTypes(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadMembershipTypes(pageIndex: number, pageSize: number) {
    this._membershipTypeService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.typesCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo los tipos de membresias.");
        return throwError(error);
      })
    ).subscribe();
  }
}
