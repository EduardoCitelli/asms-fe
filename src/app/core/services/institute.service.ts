import { Injectable } from '@angular/core';
import { BaseSimpleService } from './base-simple.service';
import { environment } from 'src/environments/environment';
import { InstituteSingleDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-single-dto';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { Observable, catchError, map } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { InstituteUpdateDto } from 'src/app/shared/interfaces/dtos/Institutes/institute-update-dto';

@Injectable({
  providedIn: 'root'
})
export class InstituteService extends BaseSimpleService {
  readonly basePath = `${environment.apiBaseUrl}institute/`;

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
