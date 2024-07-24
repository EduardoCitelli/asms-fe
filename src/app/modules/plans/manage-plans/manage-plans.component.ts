import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { PlansService } from 'src/app/core/services/plans.service';
import { PlanListDto } from 'src/app/shared/interfaces/dtos/plans/plan-list-dto';

@Component({
  selector: 'app-manage-plans',
  templateUrl: './manage-plans.component.html',
  styleUrls: ['./manage-plans.component.scss']
})
export class ManagePlansComponent implements OnInit, AfterViewInit {
  public title: string = 'Planes';
  displayedColumns: string[] = [
    "name",
    "description",
    "price",
    "option",
  ];

  dataSource: PlanListDto[] = [];
  plansCount: number = 0;

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _planService: PlansService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadPlans(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadPlansPage())
      )
      .subscribe();
  }

  public add() {
    this._router.navigate(['plans/add']);
  }

  public edit(id: number) {
    this._router.navigate(['plans/edit', id]);
  }

  public delete(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea eliminar el plan?',
    })
      .afterClosed()
      .subscribe(confirmed => {
        if (confirmed)
          this.deletePlan(id);
      });
  }

  private deletePlan(id: number) {
    this._planService.delete(id)
      .subscribe(response => {
        this.dataSource = this.dataSource.filter(x => x.id !== response.id);
        this.plansCount -= 1;
        this._toastrService.success("Plan Eliminado");
      },
        (error: string) => {
          this._toastrService.error(error);
        });
  }

  private loadPlansPage() {
    this.loadPlans(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize);
  }

  private loadPlans(pageIndex: number, pageSize: number) {
    this._planService.getPlans(pageIndex, pageSize).pipe(
      tap(plans => {
        console.log(plans)
        this.dataSource = plans.items;
        this.plansCount = plans.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo planes.");
        return throwError(error);
      })
    ).subscribe();
  }
}
