import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RoomCreateDto } from 'src/app/shared/interfaces/dtos/rooms/room-create-dto';
import { RoomListDto } from 'src/app/shared/interfaces/dtos/rooms/room-list-dto';
import { RoomSingleDto } from 'src/app/shared/interfaces/dtos/rooms/room-single-dto';
import { RoomUpdateDto } from 'src/app/shared/interfaces/dtos/rooms/room-update-dto';
import { PagedList } from 'src/app/shared/interfaces/paged-list-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseService<RoomSingleDto, RoomListDto, RoomCreateDto, RoomUpdateDto> {
  override readonly basePath = `${environment.apiBaseUrl}room/`;

  public getRoom(id: number): Observable<RoomSingleDto> {
    return this.getOne(id);
  }

  public getRooms(pageNumber: number, pageSize: number): Observable<PagedList<RoomListDto>> {
    const params = new HttpParams()
      .set('Page', pageNumber.toString())
      .set('Size', pageSize.toString());

    return this.getAll(params);
  }

  public create(dto: RoomCreateDto): Observable<RoomSingleDto> {
    return this.createBase(dto);
  }

  public update(dto: RoomUpdateDto): Observable<RoomSingleDto> {
    const url = this.basePath + dto.id;
    return this.updateBase(dto, url);
  }

  public delete(id: number): Observable<RoomSingleDto> {
    return this.deleteBase(id);
  }
}
