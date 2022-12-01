import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { AuthLoginDto } from 'src/app/shared/interfaces/dtos/auth/auth-login-dto';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public readonly userNameProperty: string = 'userName';
  public readonly passwordProperty: string = 'password';

  loginForm: FormGroup = this._formBuilder.group({
    userName: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
  ) { }

  get UserName() { return this.loginForm.get(this.userNameProperty); }
  get Password() { return this.loginForm.get(this.passwordProperty); }

  public ngOnInit(): void {
    this._authService.logout();
  }

  public login(): void {
    const login: AuthLoginDto = this.FormToDto();
    this._authService.signIn(login);
  }

  private FormToDto(): AuthLoginDto {
    return {
      userName: this.loginForm.get(this.userNameProperty)?.value,
      password: this.loginForm.get(this.passwordProperty)?.value,
    }
  }
}
