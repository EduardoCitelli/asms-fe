import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { RoleBasicDto } from 'src/app/shared/interfaces/dtos/roles/role-basic-dto';
import { RoleListDto } from 'src/app/shared/interfaces/dtos/roles/role-list-dto';
import { RoleDto } from 'src/app/shared/interfaces/dtos/roles/role-dto';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService extends BaseService<RoleBasicDto, RoleListDto, RoleDto, RoleDto> {
  override readonly basePath = `${environment.apiBaseUrl}role/`;

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<RoleListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }
}
