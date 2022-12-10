import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';
import { MembershipTypeCreateDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-create-dto';
import { MembershipTypeListDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-list-dto';
import { MembershipTypeSingleDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-single-dto';
import { MembershipTypeUpdateDto } from 'src/app/shared/interfaces/dtos/membership-types/membership-type-update-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';


@Injectable({
  providedIn: 'root'
})
export class MembershipTypeService extends BaseService<MembershipTypeSingleDto, MembershipTypeListDto, MembershipTypeCreateDto, MembershipTypeUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}membershiptype/`;

  public getOne(id: number): Observable<MembershipTypeSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<MembershipTypeListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public getCombo(): Observable<ComboDto<number>[]> {
    return this.getComboBase();
  }

  public create(dto: MembershipTypeCreateDto): Observable<MembershipTypeSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: MembershipTypeUpdateDto): Observable<MembershipTypeSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<MembershipTypeSingleDto> {
    return this.deleteBase(id);
  }
}
