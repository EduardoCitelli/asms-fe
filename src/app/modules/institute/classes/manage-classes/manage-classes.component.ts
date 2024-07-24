import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { InstituteClassService } from 'src/app/core/services/institute-class.service';
import { FilterField } from 'src/app/shared/filter/models/filter-field';
import { InstituteClassListDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-list-dto';
import { DayOfWeek } from 'src/app/shared/interfaces/enums/day-of-week.enum';
import { InstituteClassFilter } from 'src/app/shared/interfaces/filters/institute-classes/institute-classes-filters';
import { RootFilter } from 'src/app/shared/interfaces/filters/root-filter';
import { nameofFactory } from 'src/app/shared/utils/nameof-proxy';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.scss']
})
export class ManageClassesComponent implements OnInit, AfterViewInit {
  title: string = 'Clases';
  dataCount: number = 0;
  dataSource: InstituteClassListDto[] = [];
  displayedColumns: string[] = [
    "description",
    "startTime",
    "finishTime",
    "daysOfWeek",
    "fromRange",
    "toRange",
    "option",
  ];

  nameofInstituteClassFilter = nameofFactory<InstituteClassFilter>();

  filterFields: FilterField[] = [
    {
      type: 'string',
      field: this.nameofInstituteClassFilter.description,
      value: null,
      operator: 'contains',
      logic: 'and',
      description: 'Descripción',
    },
    {
      type: 'number',
      field: this.nameofInstituteClassFilter.roomId,
      value: null,
      operator: 'eq',
      logic: 'and',
      description: 'Id de salon',
    },
    {
      type: 'number',
      field: this.nameofInstituteClassFilter.principalCoachId,
      value: null,
      operator: 'eq',
      logic: 'and',
      description: 'Id de entrenador titular',
    },
    {
      type: 'number',
      field: this.nameofInstituteClassFilter.activityId,
      value: null,
      operator: 'eq',
      logic: 'and',
      description: 'Id de actividad',
    },
  ]

  apliedFilters: FilterField[] = [];

  defaultFilter: RootFilter = new RootFilter({
    field: 'isRecurrence',
    value: true,
    operator: 'eq',
    logic: 'and',
  })

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _service: InstituteClassService,
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

  add() {
    this._router.navigate(['institute/classes/add']);
  }

  edit(id: number) {
    this._router.navigate(['institute/classes/edit', id]);
  }

  getDayOfWeekName(dayOfWeek: DayOfWeek) {
    return DayOfWeek[dayOfWeek];
  }

  filterAction(filters: FilterField[]) {
    this.apliedFilters = filters;
    this.paginator!.pageIndex = 0;
    this.loadData(this.paginator!.pageIndex + 1, this.paginator!.pageSize);
  }

  private loadPage() {
    this.loadData(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize,
    );
  }

  private loadData(pageIndex: number, pageSize: number) {
    const helperFilter: RootFilter = { ...this.defaultFilter };
    helperFilter.filters = helperFilter.filters.concat(this.apliedFilters);

    this._service.getAll(pageIndex, pageSize, helperFilter).pipe(
      tap(list => {
        this.dataSource = list.items;
        this.dataCount = list.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo clases");
        return error;
      })
    ).subscribe();
  }
}
