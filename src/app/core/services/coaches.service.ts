import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CoachCreateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-create-dto';
import { CoachListDto } from 'src/app/shared/interfaces/dtos/coaches/coach-list-dto';
import { CoachSingleDto } from 'src/app/shared/interfaces/dtos/coaches/coach-single-dto';
import { CoachUpdateDto } from 'src/app/shared/interfaces/dtos/coaches/coach-update-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';

@Injectable({
  providedIn: 'root'
})
export class CoachesService extends BaseService<CoachSingleDto, CoachListDto, CoachCreateDto, CoachUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}coach/`;

  public getOne(id: number): Observable<CoachSingleDto> {
    return this.getOneBase(id);
  }

  public getAll(pageNumber: number, pageSize: number): Observable<PagedList<CoachListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public create(dto: CoachCreateDto): Observable<CoachSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: CoachUpdateDto): Observable<CoachSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<CoachSingleDto> {
    return this.deleteBase(id);
  }

  public getCombo(): Observable<ComboDto<number>[]> {
    return this.getComboBase();
  }
}
