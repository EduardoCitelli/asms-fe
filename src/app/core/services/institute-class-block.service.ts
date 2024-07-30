import { Injectable } from "@angular/core";
import { BaseSimpleService } from "./base-simple.service";
import { HttpParams } from "@angular/common/http";
import { RootFilter } from "src/app/shared/interfaces/filters/root-filter";
import { InstituteClassBlockListDto } from "src/app/shared/interfaces/dtos/institute-class-blocks/institute-class-block-list-dto";
import { environment } from "src/environments/environment";
import { BaseResponse } from "src/app/shared/interfaces/base-response";
import { PagedList } from "src/app/shared/interfaces/paged-list-dto";
import { catchError, map, Observable } from "rxjs";
import { ApiErrorResponse } from "src/app/shared/interfaces/api-error-response";
import { InstituteClassBlockSingleDto } from "src/app/shared/interfaces/dtos/institute-class-blocks/institute-class-block-single-dto";
import { InstituteClassBlockCalendarDto } from "src/app/shared/interfaces/dtos/institute-class-blocks/institute-class-block-calendar-dto";

@Injectable({
  providedIn: 'root'
})
export class InstituteClassBlockService extends BaseSimpleService {
  readonly basePath: string = `${environment.apiBaseUrl}instituteclassblock/`;

  getAll(pageNumber: number, pageSize: number, filter?: RootFilter): Observable<PagedList<InstituteClassBlockListDto>> {
    let params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    if (filter) {
      params = params.append('Filter', JSON.stringify(filter))
    }

    return this._http.get<BaseResponse<PagedList<InstituteClassBlockListDto>>>(this.basePath, { params: params })
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  getOne(id: number): Observable<InstituteClassBlockSingleDto> {
    const url = this.basePath + id;

    return this._http.get<BaseResponse<InstituteClassBlockSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  getCalendar(roomId: number, from: Date, to: Date): Observable<InstituteClassBlockCalendarDto[]> {
    const params = new HttpParams()
      .set('RoomId', roomId.toString())
      .set('From', from.toDateString())
      .set('To', to.toDateString());

    return this._http.get<BaseResponse<InstituteClassBlockCalendarDto[]>>(this.basePath + 'calendar', { params: params })
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
