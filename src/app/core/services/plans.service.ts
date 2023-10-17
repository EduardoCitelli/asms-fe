import { Injectable } from "@angular/core";
import { BaseService } from "./base-service.service";
import { PlanUpdateDto } from "src/app/shared/interfaces/dtos/plans/plan-update-dto";
import { PlanListDto } from "src/app/shared/interfaces/dtos/plans/plan-list-dto";
import { PlanCreateDto } from "src/app/shared/interfaces/dtos/plans/plan-create-dto";
import { PlanSingleDto } from "src/app/shared/interfaces/dtos/plans/plan-single-dto";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { PagedList } from "src/app/shared/interfaces/paged-list-dto";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PlansService extends BaseService<PlanSingleDto, PlanListDto, PlanCreateDto, PlanUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}plan/`;

  public getPlan(id: number): Observable<PlanSingleDto> {
    return this.getOneBase(id);
  }

  public getPlans(pageNumber: number, pageSize: number): Observable<PagedList<PlanListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: PlanCreateDto): Observable<PlanSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: PlanUpdateDto): Observable<PlanSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<PlanSingleDto> {
    return this.deleteBase(id);
  }
}
