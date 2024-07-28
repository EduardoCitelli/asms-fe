import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private readonly isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      map(event => {
        if (event instanceof HttpResponse) {
          return event.clone({ body: this.convertDates(event.body) });
        }

        return event;
      })
    );
  }

  private convertDates(body: any): any {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];

      if (this.isIsoDateString(value)) {
        const date = new Date(value);
        body[key] = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
      }
      else if (typeof value === 'object') {
        this.convertDates(value);
      }
    }

    return body;
  }

  private isIsoDateString(value: any): boolean {
    if (typeof value !== 'string') {
      return false;
    }

    return this.isoDatePattern.test(value);
  }
}
