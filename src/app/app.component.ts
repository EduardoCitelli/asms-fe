import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MyUserService } from './core/services/my-user.service';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private _jwtHelper: JwtHelperService,
    private _authService: AuthService,
    private _router: Router,
  ) { }
  ngOnInit(): void {
    const token = this._authService.getToken();

    if (token && !this._jwtHelper.isTokenExpired(token))
      return;

    this._router.navigate(['/login']);
  }
}
