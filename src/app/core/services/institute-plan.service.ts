import { Injectable } from '@angular/core';
import { BaseSimpleService } from './base-simple.service';
import { InstitutePlanCreateDto } from 'src/app/shared/interfaces/dtos/institute-plans/institute-plan-create-dto';
import { Observable, catchError, map } from 'rxjs';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InstitutePlanService extends BaseSimpleService {
  readonly basePath = `${environment.apiBaseUrl}institutePlan/`;

  create(dto: InstitutePlanCreateDto): Observable<boolean> {
    return this._http.post<BaseResponse<boolean>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  };
}
