import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { UserBasicDto } from 'src/app/shared/interfaces/dtos/users/user-basic-dto';
import { UserListDto } from 'src/app/shared/interfaces/dtos/users/user-list-dto';
import { UserCreateDto } from 'src/app/shared/interfaces/dtos/users/user-create-dto';
import { UserPersonalInfoDto } from 'src/app/shared/interfaces/dtos/users/user-personal-info.dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { HttpParams } from '@angular/common/http';

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
}
