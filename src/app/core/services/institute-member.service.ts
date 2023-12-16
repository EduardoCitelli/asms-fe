import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { InstituteMemberSingleDto } from 'src/app/shared/interfaces/dtos/institute-members/institute-member-single-dto';
import { InstituteMemberListDto } from 'src/app/shared/interfaces/dtos/institute-members/institute-member-list-dto';
import { InstituteMemberCreateDto } from 'src/app/shared/interfaces/dtos/institute-members/institute-member-create-dto';
import { InstituteMemberUpdateDto } from 'src/app/shared/interfaces/dtos/institute-members/institute-member-update-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';

@Injectable({
  providedIn: 'root'
})
export class InstituteMemberService extends BaseService<InstituteMemberSingleDto, InstituteMemberListDto, InstituteMemberCreateDto, InstituteMemberUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}instituteMember/`;

  public getOne(id: number): Observable<InstituteMemberSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<InstituteMemberListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: InstituteMemberCreateDto): Observable<InstituteMemberSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: InstituteMemberUpdateDto): Observable<InstituteMemberSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<InstituteMemberSingleDto> {
    return this.deleteBase(id);
  }
}
