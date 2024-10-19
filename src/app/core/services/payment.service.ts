import { PaymentSingleDto } from "src/app/shared/interfaces/dtos/payments/payment-single-dto";
import { BaseService } from "./base-service.service";
import { PaymentListDto } from "src/app/shared/interfaces/dtos/payments/payment-list-dto";
import { PaymentCreateDto } from "src/app/shared/interfaces/dtos/payments/payment-create-dto";
import { PaymentUpdateDto } from "src/app/shared/interfaces/dtos/payments/payment-update-dto";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Observable, catchError, map } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { PagedList } from "src/app/shared/interfaces/paged-list-dto";
import { BaseResponse } from "src/app/shared/interfaces/base-response";
import { ApiErrorResponse } from "src/app/shared/interfaces/api-error-response";
import { RootFilter } from "src/app/shared/interfaces/filters/root-filter";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService<PaymentSingleDto, PaymentListDto, PaymentCreateDto, PaymentUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}Payment/`;

  public getOne(id: number): Observable<PaymentSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number, filter?: RootFilter): Observable<PagedList<PaymentListDto>> {
    let params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

      if (filter) {
        params = params.append('Filter', JSON.stringify(filter))
      }

    return this.getAllBase(params);
  }

  public create(dto: PaymentCreateDto): Observable<PaymentSingleDto> {
    return this.createBase(dto);
  }

  public createForce(dto: PaymentCreateDto): Observable<PaymentSingleDto> {
    return this._http.post<BaseResponse<PaymentSingleDto>>(this.basePath + 'force', dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
