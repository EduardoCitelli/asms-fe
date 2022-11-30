import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading$: Subject<boolean> = new Subject();

  constructor() { }

  public startLoading() {
    this.loading$.next(true);
  }

  public stopLoading() {
    this.loading$.next(false);
  }
}
