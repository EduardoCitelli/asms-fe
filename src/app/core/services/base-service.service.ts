import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { BaseSimpleService } from './base-simple.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TSingleDto, TListDto, TCreateDto, TUpdateDto> extends BaseSimpleService {
  abstract readonly basePath: string;

  protected getOneBase(id: number): Observable<TSingleDto> {
    const url = this.basePath + id;

    return this._http.get<BaseResponse<TSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  protected getAllBase(params: HttpParams): Observable<PagedList<TListDto>> {
    return this._http.get<BaseResponse<PagedList<TListDto>>>(this.basePath, { params: params })
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  protected getComboBase(): Observable<ComboDto<number>[]> {
    const url = this.basePath + 'combos'
    return this._http.get<BaseResponse<ComboDto<number>[]>>(url)
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      )
  }

  protected createBase(dto: TCreateDto): Observable<TSingleDto> {
    return this._http.post<BaseResponse<TSingleDto>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  protected updateBase(dto: TUpdateDto, url: string): Observable<TSingleDto> {
    return this._http.put<BaseResponse<TSingleDto>>(url, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  protected deleteBase(id: number): Observable<TSingleDto> {
    const url = this.basePath + id;

    return this._http.delete<BaseResponse<TSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
