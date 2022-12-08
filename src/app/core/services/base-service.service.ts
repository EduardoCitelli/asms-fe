import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { BaseSimpleService } from './base-simple.service';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<TSingleDto, TListDto, TCreateDto, TUpdateDto> extends BaseSimpleService {
  protected readonly basePath: string = '';

  protected getOne(id: number): Observable<TSingleDto> {
    const url = this.basePath + id;

    return this._http.get<BaseResponse<TSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  protected getAll(params: HttpParams): Observable<PagedList<TListDto>>{

    return this._http.get<BaseResponse<PagedList<TListDto>>>(this.basePath, {params: params})
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError(this.handleError)
      );
  }

  protected createBase(dto: TCreateDto): Observable<TSingleDto> {
    return this._http.post<BaseResponse<TSingleDto>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  protected updateBase(dto: TUpdateDto, url: string): Observable<TSingleDto> {
    return this._http.put<BaseResponse<TSingleDto>>(url, dto)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  protected deleteBase(id: number): Observable<TSingleDto> {
    const url = this.basePath + id;

    return this._http.delete<BaseResponse<TSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }
}
