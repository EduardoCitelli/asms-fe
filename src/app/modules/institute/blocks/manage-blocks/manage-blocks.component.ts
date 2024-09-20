import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { InstituteClassBlockService } from 'src/app/core/services/institute-class-block.service';
import { FilterField } from 'src/app/shared/modules/filter/models/filter-field';
import { InstituteClassBlockListDto } from 'src/app/shared/interfaces/dtos/institute-class-blocks/institute-class-block-list-dto';
import { ClassStatus } from 'src/app/shared/interfaces/enums/class-status.enum';
import { DayOfWeek } from 'src/app/shared/interfaces/enums/day-of-week.enum';
import { RootFilter } from 'src/app/shared/interfaces/filters/root-filter';
import { manageBlocksFilterFields } from './models/manage-blocks.filters';
import { ConfirmDialogComponent } from 'src/app/core/confirm-dialog/confirm-dialog.component';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-blocks',
  templateUrl: './manage-blocks.component.html',
  styleUrls: ['./manage-blocks.component.scss']
})
export class ManageBlocksComponent {
  title: string = 'Horarios';
  dataCount: number = 0;
  dataSource: InstituteClassBlockListDto[] = [];
  displayedColumns: string[] = [
    "description",
    "principalCoachName",
    "startDateTime",
    "finishDateTime",
    "dayOfWeek",
    "classStatus",
    "option",
  ];

  filterFields: FilterField[] = manageBlocksFilterFields;
  apliedFilters: FilterField[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _service: InstituteClassBlockService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loadData(1, 5);
  }

  ngAfterViewInit(): void {
    this.paginator!.page
      .pipe(
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  edit(id: number) {
    this._router.navigate(['institute/blocks/edit', id]);
  }

  cancel(id: number) {
    this._dialog.open(ConfirmDialogComponent, {
      data: '¿Esta seguro que desea cancelar la clase?',
    })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(confirmed => {
        if (confirmed)
          this.cancelClass(id);
      });
  }

  getDayOfWeekName(dayOfWeek: DayOfWeek) {
    return DayOfWeek[dayOfWeek];
  }

  getStatusName(status: ClassStatus) {
    return ClassStatus[status];
  }

  filterAction(filters: FilterField[]) {
    this.apliedFilters = filters;
    this.paginator!.pageIndex = 0;
    this.loadData(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
  }

  private cancelClass(id: number) {
    this._service.cancel(id)
      .pipe(
        tap(response => {
          if (response) {
            this.showSuccess("Clase cancelada correctamente");
            this.loadData(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
          }
        }),
        catchError(error => {
          this.showError(error);
          return error;
        })
      ).subscribe();
  }

  private loadPage() {
    this.loadData(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize,
    );
  }

  private loadData(pageIndex: number, pageSize: number) {
    let helperFilter;

    if (this.apliedFilters.length > 0) {
      helperFilter = new RootFilter(this.apliedFilters);
    }

    this._service.getAll(pageIndex, pageSize, helperFilter).pipe(
      tap(list => {
        this.dataSource = list.items;
        this.dataCount = list.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo los horarios");
        return error;
      })
    ).subscribe();
  }

  private showSuccess(message: string) {
    this._toastrService.success(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }
}
