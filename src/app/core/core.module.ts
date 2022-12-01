import { DEFAULT_CURRENCY_CODE, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderModule } from './loader/loader.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { NavbarModule } from './navbar/navbar.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoaderModule,
    HttpClientModule,
    NavbarModule,
  ],
  exports: [
    HttpClientModule,
    LoaderModule,
    NavbarModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: DEFAULT_CURRENCY_CODE, useValue: '$' },
  ]
})
export class CoreModule { }
