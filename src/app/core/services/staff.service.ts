import { Injectable } from '@angular/core';
import { StaffCreateDto } from 'src/app/shared/interfaces/dtos/staff/staff-create-dto';
import { StaffListDto } from 'src/app/shared/interfaces/dtos/staff/staff-list-dto';
import { StaffSingleDto } from 'src/app/shared/interfaces/dtos/staff/staff-single-dto';
import { StaffUpdateDto } from 'src/app/shared/interfaces/dtos/staff/staff-update-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';

@Injectable({
  providedIn: 'root'
})
export class StaffService extends BaseService<StaffSingleDto, StaffListDto, StaffCreateDto, StaffUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}StaffMember/`;

  public getOne(id: number): Observable<StaffSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<StaffListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: StaffCreateDto): Observable<StaffSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: StaffUpdateDto): Observable<StaffSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<StaffSingleDto> {
    return this.deleteBase(id);
  }

}
