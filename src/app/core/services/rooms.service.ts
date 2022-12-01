import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { RoomCreateDto } from 'src/app/shared/interfaces/dtos/rooms/room-create-dto';
import { RoomListDto } from 'src/app/shared/interfaces/dtos/rooms/room-list-dto';
import { RoomSingleDto } from 'src/app/shared/interfaces/dtos/rooms/room-single-dto';
import { RoomUpdateDto } from 'src/app/shared/interfaces/dtos/rooms/room-update-dto';
import { environment } from 'src/environments/environment';
import { BaseService } from './base-service.service';

@Injectable({
  providedIn: 'root'
})
export class RoomsService extends BaseService {
  private readonly basePath = `${environment.apiBaseUrl}rooms/`;

  public getRoom(id: number): Observable<BaseResponse<RoomSingleDto>> {
    const url = this.basePath + id;

    return this._http.get<BaseResponse<RoomSingleDto>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRooms(): Observable<BaseResponse<RoomListDto[]>> {
    return this._http.get<BaseResponse<RoomListDto[]>>(this.basePath)
      .pipe(
        catchError(this.handleError)
      );
  }

  public create(dto: RoomCreateDto): Observable<BaseResponse<RoomSingleDto>> {
    return this._http.post<BaseResponse<RoomSingleDto>>(this.basePath, dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  public update(dto: RoomUpdateDto) {
    const url = this.basePath + dto.id;

    return this._http.put<BaseResponse<RoomSingleDto>>(url, dto)
      .pipe(
        catchError(this.handleError)
      );
  }

  public delete(id: number) {
    const url = this.basePath + id;

    return this._http.delete<BaseResponse<RoomSingleDto>>(url)
      .pipe(
        catchError(this.handleError)
      );
  }
}
