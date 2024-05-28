import { Injectable } from '@angular/core';
import { BaseSimpleService } from './base-simple.service';
import { environment } from 'src/environments/environment';
import { InstituteSingleDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-single-dto';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { Observable, catchError, map } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { InstituteUpdateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-update-dto';
import { BaseService } from './base-service.service';
import { InstituteListDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-list-dto';
import { InstituteCreateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-create-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InstituteService extends BaseService<InstituteSingleDto, InstituteListDto, InstituteCreateDto, InstituteUpdateDto> {
  readonly basePath = `${environment.apiBaseUrl}institute/`;

  public getOne(id: number): Observable<InstituteSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<InstituteListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: InstituteCreateDto): Observable<InstituteSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: InstituteUpdateDto): Observable<InstituteSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<InstituteSingleDto> {
    return this.deleteBase(id);
  }

  public getMine(): Observable<InstituteSingleDto> {
    const url = this.basePath + 'mine';

    return this._http.get<BaseResponse<InstituteSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  public updateMine(dto: InstituteUpdateDto) : Observable<InstituteSingleDto> {
    const url = this.basePath;

    return this._http.put<BaseResponse<InstituteSingleDto>>(url, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
