import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { UserBasicDto } from 'src/app/shared/interfaces/dtos/users/user-basic-dto';
import { UserListDto } from 'src/app/shared/interfaces/dtos/users/user-list-dto';
import { UserCreateDto } from 'src/app/shared/interfaces/dtos/users/user-create-dto';
import { UserPersonalInfoDto } from 'src/app/shared/interfaces/dtos/users/user-personal-info.dto';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map } from 'rxjs';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { HttpParams } from '@angular/common/http';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { UserUpdateDto } from 'src/app/shared/interfaces/dtos/users/user-update-dto';
import { RoleTypeEnum } from 'src/app/shared/interfaces/enums/role-type-enum';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService<UserBasicDto, UserListDto, UserCreateDto, UserPersonalInfoDto>{
  override readonly basePath = `${environment.apiBaseUrl}user/`;

  public getOne(id: number): Observable<UserBasicDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<UserListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public update(dto: UserUpdateDto): Observable<UserBasicDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public blockUnblockUser(id:number, isBlockAction: boolean) {
    const endpoint = isBlockAction ? 'block' : 'unblock';

    const url = `${this.basePath}${endpoint}/${id}`;

    return this._http.put<BaseResponse<boolean>>(url, null)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
  }

  public getUserRoles(id: number): Observable<RoleTypeEnum[]> {
    const url = `${this.basePath}${id}/roles`;

    return this._http.get<BaseResponse<RoleTypeEnum[]>>(url)
    .pipe(
      map(res => res.content),
      catchError((error: ApiErrorResponse) => {
        return this.handleError(error);
      })
    );
  }

  public updateUserRoles(id: number, roles: RoleTypeEnum[]) {
    const url = `${this.basePath}${id}/roles`;

    return this._http.put<BaseResponse<boolean>>(url, roles)
    .pipe(
      map(res => res.content),
      catchError((error: ApiErrorResponse) => {
        return this.handleError(error);
      })
    );
  }
}
