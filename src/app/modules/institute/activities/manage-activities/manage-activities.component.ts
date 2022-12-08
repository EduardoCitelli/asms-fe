import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { ActivitiesService } from 'src/app/core/services/activities.service';
import { ActivityListDto } from 'src/app/shared/interfaces/dtos/activities/activity-list-dto';

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.css']
})
export class ManageActivitiesComponent implements OnInit, AfterViewInit {
  public title: string = 'Actividades';
  displayedColumns: string[] = [
    "name",
    "description",
    "option",
  ];

  dataSource: ActivityListDto [] = [];
  activitiesCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _activityService: ActivitiesService,
    private _router: Router,
    private _snackBar: MatSnackBar,
    private _dialog: MatDialog,
  ){

  }

  ngOnInit(): void {
    this.loadActivites(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadActivitesPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['institute/activites/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/activites/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar la actividad?',
    })
    .afterClosed()
    .subscribe( confirmed => {
      if (confirmed)
        this.deleteActivity(id);
    });

  }

  private deleteActivity(id: number) {
    this._activityService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.activitiesCount -= 1;
        this._snackBar.open("Actividad Eliminada", 'Aceptar');
      });
  }

  private loadActivitesPage() {
    this.loadActivites(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadActivites(pageIndex: number, pageSize: number) {
    this._activityService.getActivities(pageIndex, pageSize).pipe(
      tap(activites => {
        this.dataSource = activites.items;
        this.activitiesCount = activites.totalCount;
      }),
      catchError(error => {
        console.log(error);
        this._snackBar.open("Error obteniendo actividades.", "Aceptar");
        return throwError(error);
      })
    ).subscribe();
  }
}
