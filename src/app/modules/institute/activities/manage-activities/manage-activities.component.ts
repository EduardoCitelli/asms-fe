import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { ActivityListDto } from 'src/app/shared/interfaces/dtos/activities/activity-list-dto';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit, AfterViewInit {
  public title: string = 'Actividades';
  displayedColumns: string[] = [
    "id",
    "name",
    "description",
    "option",
  ];

  dataSource: ActivityListDto[] = [];
  activitiesCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _activityService: ActivitiesService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.loadActivities(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadActivitiesPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institute/activities/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/activities/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar la actividad?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deleteActivity(id);
      });
  }

  private deleteActivity(id: number) {
    this._activityService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.activitiesCount -= 1;
        this._toastrService.success("Actividad Eliminada");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadActivitiesPage() {
    this.loadActivities(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadActivities(pageIndex: number, pageSize: number) {
    this._activityService.getActivities(pageIndex, pageSize).pipe(
      tap(activites => {
        this.dataSource = activites.items;
        this.activitiesCount = activites.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo actividades.");
        return throwError(error);
      })
    ).subscribe();
  }
}
