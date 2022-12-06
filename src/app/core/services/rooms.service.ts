import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
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
export class RoomsService extends BaseService {
  private readonly basePath = `${environment.apiBaseUrl}room/`;

  public getRoom(id: number): Observable<RoomSingleDto> {
    const url = this.basePath + id;

    return this._http.get<BaseResponse<RoomSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  public getRooms(pageNumber: number, pageSize: number): Observable<PagedList<RoomListDto>>{
    const params = new HttpParams()
    .set('Page', pageNumber.toString())
    .set('Size', pageSize.toString());

    return this._http.get<BaseResponse<PagedList<RoomListDto>>>(this.basePath, {params: params})
      .pipe(
        map(res => {
          return res.content;
        }),
        catchError(this.handleError)
      );
  }

  public create(dto: RoomCreateDto): Observable<RoomSingleDto> {
    return this._http.post<BaseResponse<RoomSingleDto>>(this.basePath, dto)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  public update(dto: RoomUpdateDto): Observable<RoomSingleDto> {
    const url = this.basePath + dto.id;

    return this._http.put<BaseResponse<RoomSingleDto>>(url, dto)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }

  public delete(id: number): Observable<RoomSingleDto> {
    const url = this.basePath + id;

    return this._http.delete<BaseResponse<RoomSingleDto>>(url)
      .pipe(
        map(res => res.content),
        catchError(this.handleError)
      );
  }
}
