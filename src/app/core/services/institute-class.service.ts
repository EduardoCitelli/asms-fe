import { Injectable } from '@angular/core';
import { BaseService } from './base-service.service';
import { InstituteClassSingleDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-single-dto';
import { InstituteClassListDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-list-dto';
import { InstituteClassCreateDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-create-dto';
import { InstituteClassUpdateDto } from 'src/app/shared/interfaces/dtos/institute-classes/institute-class-update-dto';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { RootFilter } from 'src/app/shared/interfaces/filters/root-filter';

@Injectable({
  providedIn: 'root'
})
export class InstituteClassService extends BaseService<InstituteClassSingleDto, InstituteClassListDto, InstituteClassCreateDto, InstituteClassUpdateDto> {
  override readonly basePath: string = `${environment.apiBaseUrl}instituteclass/`;

  public getOne(id: number): Observable<InstituteClassSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number, filter?: RootFilter): Observable<PagedList<InstituteClassListDto>> {
    let params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    if (filter) {
      params = params.append('Filter', JSON.stringify(filter))
    }

    return this.getAllBase(params);
  }

  public create(dto: InstituteClassCreateDto): Observable<InstituteClassSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: InstituteClassUpdateDto, id: number): Observable<InstituteClassSingleDto> {
    const url = this.basePath + id;
    return this.updateBase(dto, url);
  }
}
