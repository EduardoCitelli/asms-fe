import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { BaseSimpleService } from './base-simple.service';
import { InstituteMemberMembershipCreateDto } from 'src/app/shared/interfaces/dtos/institute-member-membership/institute-member-membership-create-dto';
import { InstituteMemberMembershipUpdateDto } from 'src/app/shared/interfaces/dtos/institute-member-membership/institute-member-membership-update-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class InstituteMemberMembershipService extends BaseSimpleService {
  readonly basePath = `${environment.apiBaseUrl}institutemembermembership/`;

  create(dto: InstituteMemberMembershipCreateDto): Observable<number> {
    return this._http.post<BaseResponse<number>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  update(dto: InstituteMemberMembershipUpdateDto): Observable<number> {
    return this._http.put<BaseResponse<number>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }
}
