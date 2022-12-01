import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';
import { BaseResponse } from 'src/app/shared/interfaces/base-response';
import { AuthLoginDto } from 'src/app/shared/interfaces/dtos/auth/auth-login-dto';
import { AuthResponseDto } from 'src/app/shared/interfaces/dtos/auth/auth-response-dto';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from './local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = `${environment.apiBaseUrl}auth/`;
  private loggedIn: BehaviorSubject<boolean>;
  private endpoints = {
    login: `${this.basePath}`,
  }

  public logged: Observable<boolean>;
  public redirectUrl: string | undefined;

  constructor(
    private localStorageService: LocalStorageService,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
  ) {
    this.loggedIn = new BehaviorSubject<boolean>(false);
    this.logged = this.loggedIn.asObservable();
   }

   get isLoggedIn(): boolean {
    return !!this.currentUser();
  }

  public signIn(user: AuthLoginDto): void {
    this.login(user).subscribe(
      response => {
        this.localStorageService.setItem('loggedUser', JSON.stringify(response.content));

        this.loggedIn.next(true);

        this.router.navigate(['/home']);
      },
      error => {
        this.toastr.error(error, 'Login');
      });
  }

  public logout(): void {
    this.clearUser();
    this.router.navigate(['/login']);
  }

  public getToken(): string {
    const token: string = this.currentUser()?.token;
    return token;
  }

  public checkLogged(status: boolean) {
    this.loggedIn.next(status);
  }

  private currentUser(): AuthResponseDto {
    return JSON.parse(this.localStorageService.getItem('loggedUser'));
  }

  private login(request: AuthLoginDto): Observable<BaseResponse<AuthResponseDto>> {
    return this.http.post<BaseResponse<AuthResponseDto>>(this.endpoints.login, request)
      .pipe(
        catchError(this.handleError)
      );
  }

  private clearUser(): void {
    this.localStorageService.removeItem('loggedUser');
    this.loggedIn.next(false);
  }

  private handleError(error: ApiErrorResponse): Observable<never> {
    if (error.status === 401)
      this.router.navigate(['/login']);

    let errorMessage: string;

    if (error.error instanceof ErrorEvent)
      errorMessage = `An error occurred: ${error.error.message}`;
    else
      errorMessage = `An error occurred: ${error.error?.errors}`;

    return throwError(errorMessage);
  }
}
