import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { InstituteService } from 'src/app/core/services/institute.service';
import { InstituteListDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-list-dto';
import { SetInstitutePlanDialogComponent } from '../set-institute-plan-dialog/set-institute-plan-dialog.component';
import { UntilDestroy } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-institutes',
  templateUrl: './manage-institutes.component.html',
  styleUrls: ['./manage-institutes.component.scss']
})
export class ManageInstitutesComponent {
  public title: string = "Instituciones"
  displayedColumns: string[] = [
    "institutionName",
    "isEnabled",
    "option",
  ];

  dataSource: InstituteListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _service: InstituteService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadInstitutes(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadInstitutesPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institutes/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institutes/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar a la institución?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteInstitute(id);
      });
  }

  public showPlans(institute: InstituteListDto) {
    this._dialog.open(SetInstitutePlanDialogComponent, {
      data: institute,
      width: '40rem'
    }).afterClosed()
      .subscribe(confirmed => {
        if (confirmed) {
          this.loadInstitutes(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
        }
      });
  }

  public disable(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea deshabilitar la institución?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.disableInstitute(id);
      });
  }

  private deleteInstitute(id: number) {
    this._service.delete(id).pipe(
      tap(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.dataCount -= 1;
        this._toastrService.success("Institución Eliminada.");
      }),
      catchError((error: string) => {
        this._toastrService.error(error);
        return error;
      })).subscribe();
  }

  private disableInstitute(id: number) {
    this._service.disable(id).pipe(
      tap(response => {
        if (response) {
          this._toastrService.success("Institución deshabilitada.");
          this.loadInstitutes(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
        }
      }),
      catchError((error: string) => {
        this._toastrService.error(error);
        return error;
      })
    ).subscribe();
  }

  private loadInstitutesPage() {
    this.loadInstitutes(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );
  }

  private loadInstitutes(pageIndex: number, pageSize: number) {
    this._service.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo instituciones.");
        return error;
      })
    ).subscribe();
  }
}
