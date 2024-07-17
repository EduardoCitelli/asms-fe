import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable()
export class TimeSpanInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const minutesOffset = new Date().getTimezoneOffset();

    request = request.clone({
      setHeaders: {
        'minutes-offset': minutesOffset.toString(),
      },
    });

    return next.handle(request);
  }
}
