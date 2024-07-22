import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { InstituteClassService } from 'src/app/core/services/institute-class.service';
import { InstituteClassListDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-list-dto';
import { RootFilter } from 'src/app/shared/interfaces/filters/root-filter';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-classes',
  templateUrl: './manage-classes.component.html',
  styleUrls: ['./manage-classes.component.css']
})
export class ManageClassesComponent implements OnInit, AfterViewInit {
  title: string = 'Clases';
  dataCount: number = 0;
  dataSource: InstituteClassListDto[] = [];
  displayedColumns: string[] = [
    "description",
    "startTime",
    "finishTime",
    "fromRange",
    "toRange",
    "option",
  ];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _service: InstituteClassService,
    private _router: Router,
    private _toastrService: ToastrService,
    private _dialog: MatDialog,
  ) {

  }

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

  public add() {
    this._router.navigate(['institute/classes/add']);
  }

  public edit(id: number) {
    this._router.navigate(['institute/classes/edit', id]);
  }

  private loadPage() {
    this.loadData(
      this.paginator!.pageIndex + 1,
      this.paginator!.pageSize
    );
  }

  private loadData(pageIndex: number, pageSize: number, filter?: RootFilter) {
    this._service.getAll(pageIndex, pageSize, filter).pipe(
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
