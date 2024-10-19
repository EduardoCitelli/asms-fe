import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PaymentListDto } from 'src/app/shared/interfaces/dtos/payments/payment-list-dto';
import { FilterField } from 'src/app/shared/modules/filter/models/filter-field';
import { managePaymentsFilter } from './models/manage-payments.filters';
import { MatPaginator } from '@angular/material/paginator';
import { PaymentsService } from 'src/app/core/services/payment.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PaymentType } from 'src/app/shared/interfaces/enums/payment-type.enum';
import { RootFilter } from 'src/app/shared/interfaces/filters/root-filter';
import { catchError, tap } from 'rxjs';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ViewPaymentModalComponent } from 'src/app/shared/components/view-payment-modal/view-payment-modal.component';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-payments',
  templateUrl: './manage-payments.component.html',
  styleUrls: ['./manage-payments.component.scss']
})
export class ManagePaymentsComponent implements OnInit, AfterViewInit {
  title: string = 'Pagos';
  dataCount: number = 0;
  dataSource: PaymentListDto[] = [];

  displayedColumns: string[] = [
      "emittedDate",
      "amount",
      "payBy",
      "paymentType",
      'option',
  ];

  filterFields: FilterField[] = managePaymentsFilter;
  apliedFilters: FilterField[] = [];

  @ViewChild(MatPaginator)
  paginator: MatPaginator | null = null;

  constructor(
    private _service: PaymentsService,
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

  view(id: number) {
    this._dialog.open(ViewPaymentModalComponent, {
      data: id,
      width: '40rem',
    });
  }

  getPaymentTypeName(status: PaymentType) {
    return PaymentType[status];
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
    let helperFilter;

    if (this.apliedFilters.length > 0) {
      helperFilter = new RootFilter(this.apliedFilters);
    }

    this._service.getAll(pageIndex, pageSize, helperFilter)
    .pipe(
      tap(list => {
        this.dataSource = list.items;
        this.dataCount = list.totalCount;
      }),
      catchError(error => {
        this._toastrService.error("Error obteniendo los pagos");
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
