import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { CoachesService } from 'src/app/core/services/coaches.service';
import { CoachListDto } from 'src/app/shared/interfaces/dtos/coaches/coach-list-dto';

@Component({
  selector: 'app-manage-coaches',
  templateUrl: './manage-coaches.component.html',
  styleUrls: ['./manage-coaches.component.css']
})
export class ManageCoachesComponent {
  public title: string = "Profesores"
  displayedColumns: string[] = [
    "fullName",
    "phone",
    "option",
  ];

  dataSource: CoachListDto[] = [];
  dataCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _coachesService: CoachesService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadCoaches(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadCoachPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institute/coaches/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/coaches/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar el profesor?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteCoach(id);
      });
  }

  private deleteCoach(id: number) {
    this._coachesService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.dataCount -= 1;
        this._toastrService.success("Profesor Eliminado");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadCoachPage() {
    this.loadCoaches(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadCoaches(pageIndex: number, pageSize: number) {
    this._coachesService.getAll(pageIndex, pageSize).pipe(
      tap(response => {
        this.dataSource = response.items;
        this.dataCount = response.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo los profesores.");
        return throwError(error);
      })
    ).subscribe();
  }
}
