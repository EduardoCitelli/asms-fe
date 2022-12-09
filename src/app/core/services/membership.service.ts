import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MembershipCreateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-create-dto';
import { MembershipListDto } from 'src/app/shared/interfaces/dtos/memberships/membership-list-dto';
import { MembershipSingleDto } from 'src/app/shared/interfaces/dtos/memberships/membership-single-dto';
import { MembershipUpdateDto } from 'src/app/shared/interfaces/dtos/memberships/membership-update-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService extends BaseService<MembershipSingleDto, MembershipListDto, MembershipCreateDto, MembershipUpdateDto> {
  override readonly basePath: string = `${environment.apiBaseUrl}membership/`;

  public getOne(id: number): Observable<MembershipSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<MembershipListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: MembershipCreateDto): Observable<MembershipSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: MembershipUpdateDto): Observable<MembershipSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<MembershipSingleDto> {
    return this.deleteBase(id);
  }
}
