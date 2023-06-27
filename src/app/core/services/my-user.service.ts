import { Injectable } from '@angular/core';
import { BaseSimpleService } from './base-simple.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';
import { UpdateMyUserDto } from 'src/app/shared/interfaces/dtos/my-user/update-my-user-dto';
import { UserBasicDto } from 'src/app/shared/interfaces/dtos/users/user-basic-dto';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { Observable, catchError, map } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { UpdateMyPasswordDto } from 'src/app/shared/interfaces/dtos/my-user/update-my-password-dto';
import { AuthResponseDto } from 'src/app/shared/interfaces/dtos/auth/auth-response-dto';

@Injectable({
  providedIn: 'root'
})
export class MyUserService extends BaseSimpleService {
  private basePath = `${environment.apiBaseUrl}myUser/`;

  private endpoints = {
    updateUser: `${this.basePath}`,
    updatePassword: `${this.basePath}password`
  }

  constructor(
    private localStorageService: LocalStorageService,
    private toastr: ToastrService,
    http: HttpClient,
    router: Router,
  ) {
    super(http, router);
   }

   public updateUser(request: UpdateMyUserDto) {
    return this._http.put<BaseResponse<UserBasicDto>>(this.endpoints.updateUser, request)
      .pipe(
        map(res => {
          const loggedUser: AuthResponseDto = JSON.parse(this.localStorageService.getItem('loggedUser'));
          const updateUser: AuthResponseDto = {
            ...res.content,
            userName: loggedUser.userName,
            token: loggedUser.token,
            roles: loggedUser.roles,
          }

          this.localStorageService.setItem('loggedUser', JSON.stringify(updateUser));
          return res.content;
        }),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
   }

   public updatePassword(request: UpdateMyPasswordDto) : Observable<boolean> {
    return this._http.put<BaseResponse<boolean>>(this.endpoints.updatePassword, request)
      .pipe(
        map(res => res.content),
        catchError((error: ApiErrorResponse) => {
          return this.handleError(error);
        })
      );
   }
}
