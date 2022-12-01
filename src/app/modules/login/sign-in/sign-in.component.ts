import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthLoginDto } from 'src/app/shared/interfaces/dtos/auth/auth-login-dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthService,
    private _router: Router,
    private _formBuilder: FormBuilder,
  ) { }

  get dsUsername() { return this.loginForm.get('userName'); }
  get dsPassword() { return this.loginForm.get('password'); }

  public ngOnInit(): void {
    this._authService.logout();
  }

  public login(form: any): void {
    const login: AuthLoginDto = {
      userName: form.userName,
      password: form.password,
    };

    this._authService.signIn(login);
  }
}
