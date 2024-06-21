import { PaymentSingleDto } from "src/app/shared/interfaces/dtos/payments/payment-single-dto";
import { BaseService } from "./base-service.service";
import { PaymentListDto } from "src/app/shared/interfaces/dtos/payments/payment-list-dto";
import { PaymentCreateDto } from "src/app/shared/interfaces/dtos/payments/payment-create-dto";
import { PaymentUpdateDto } from "src/app/shared/interfaces/dtos/payments/payment-update-dto";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpParams } from "@angular/common/http";
import { PagedList } from "src/app/shared/interfaces/paged-list-dto";

@Injectable({
  providedIn: 'root'
})
export class PaymentsService extends BaseService<PaymentSingleDto, PaymentListDto, PaymentCreateDto, PaymentUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}Payment/`;

  public getPayment(id: number): Observable<PaymentSingleDto> {
    return this.getOneBase(id);
  }

  public getPayments(pageNumber: number, pageSize: number): Observable<PagedList<PaymentListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: PaymentCreateDto): Observable<PaymentSingleDto> {
    return this.createBase(dto);
  }
}