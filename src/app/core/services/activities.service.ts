import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivityCreateDto } from 'src/app/shared/interfaces/dtos/activities/activity-create-dto';
import { ActivityListDto } from 'src/app/shared/interfaces/dtos/activities/activity-list-dto';
import { ActivitySingleDto } from 'src/app/shared/interfaces/dtos/activities/activity-single-dto';
import { ActivityUpdateDto } from 'src/app/shared/interfaces/dtos/activities/activity-update-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';
import { ComboDto } from 'src/app/shared/interfaces/combo-dto';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService extends BaseService<ActivitySingleDto, ActivityListDto, ActivityCreateDto, ActivityUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}activity/`;

  public getActivity(id: number): Observable<ActivitySingleDto> {
    return this.getOneBase(id);
  }

  public getActivities(pageNumber: number, pageSize: number): Observable<PagedList<ActivityListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAllBase(params);
  }

  public getCombo(): Observable<ComboDto<number>[]> {
    return this.getComboBase();
  }

  public create(dto: ActivityCreateDto): Observable<ActivitySingleDto> {
    return this.createBase(dto);
  }

  public update(dto: ActivityUpdateDto): Observable<ActivitySingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<ActivitySingleDto> {
    return this.deleteBase(id);
  }
}
