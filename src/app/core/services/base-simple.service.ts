import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ApiErrorResponse } from 'src/app/shared/interfaces/api-error-response';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseSimpleService {
  constructor(
    protected _http: HttpClient,
    protected _router: Router,
  ) { }

  protected handleError(error: ApiErrorResponse): Observable<never> {
    if (error.status === 401)
      this._router.navigate(['/login']);

    let errorMessage: string;

    if (error.error instanceof ErrorEvent)
      errorMessage = `An error occurred: ${error.error.message}`;
    else
      errorMessage = `An error occurred: ${error.error?.errors}`;

    return throwError(() => errorMessage);
  }
}
