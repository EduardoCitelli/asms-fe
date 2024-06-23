import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { InstituteMemberService } from 'src/app/core/services/institute-member.service';
import { InstituteMemberListDto } from 'src/app/shared/interfaces/dtos/institute-members/institute-member-list-dto';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-manage-institute-members',
  templateUrl: './manage-institute-members.component.html',
  styleUrls: ['./manage-institute-members.component.css']
})
export class ManageInstituteMembersComponent {
  title: string = "Miembros de la institución"
  displayedColumns: string[] = [
    "fullName",
    "phone",
    "option",
  ];

  dataSource: InstituteMemberListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _instituteMemberService: InstituteMemberService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ){ }

  ngOnInit(): void {
    this.loadInstituteMembers(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadInstituteMembersPage())
      )
      .subscribe();
  }

  add() {
    this._router.navigate(['institute-members/add']);
  }

  edit(id: number) {
    this._router.navigate(['institute-members/edit', id]);
  }

  delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar al miembro de la institución?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteInstituteMember(id);
      });
  }

  assignMembership(id: number, isUpdateMembership: boolean) {
    const baseRoute = 'institute-members/';

    const route = isUpdateMembership ? `${baseRoute}update-membership` : `${baseRoute}assign-membership`;

    this._router.navigate([route, id]);
  }

  private deleteInstituteMember(id: number) {
    this._instituteMemberService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.dataCount -= 1;
        this._toastrService.success("Miembro de la institución Eliminado");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadInstituteMembersPage() {
    this.loadInstituteMembers(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadInstituteMembers(pageIndex: number, pageSize: number) {
    this._instituteMemberService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo usuarios del instituto.");
        return throwError(error);
      })
    ).subscribe();
  }
}
