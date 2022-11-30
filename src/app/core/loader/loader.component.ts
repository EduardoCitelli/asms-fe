import { ChangeDetectorRef, Component, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {
  loadingSubscription!: Subscription;
  showSpinner: boolean = false;

  constructor(
    private _loaderService: LoaderService,
    private _elmRef: ElementRef,
    private _changeDetectorRef: ChangeDetectorRef,
  )
  { }

  ngAfterViewInit(): void {
    this.showSpinner = false;
    this.loadingSubscription = this._loaderService.loading$.pipe().subscribe((status: boolean) => {
      this._elmRef.nativeElement.style.display = status ? this.showSpinner = true : this.showSpinner = false;
      this._changeDetectorRef.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }
}
