import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsersService } from 'src/app/core/services/users.service';
import { UserUpdateDto } from 'src/app/shared/interfaces/dtos/users/user-update-dto';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  public readonly firstNameProperty: string = 'firstName';
  public readonly lastNameProperty: string = 'lastName';
  public readonly emailProperty: string = 'email';
  id: number = 0;
  title: string = "Editar Usuario";

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _userService: UsersService,
    private _toastrService: ToastrService,
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
  ) {
    this.form = this._formBuilder.group({
      firstName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3)]),
      email: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(3), Validators.email]),
    });
  }

  get FirstName() { return this.form.get(this.firstNameProperty); }
  get LastName() { return this.form.get(this.lastNameProperty); }
  get Email() { return this.form.get(this.emailProperty); }

  ngOnInit(): void {
    const userId = this._activatedRoute.snapshot.paramMap.get('id');

    if (userId)
      this.id = Number(userId);

    this.getAndSetFormInfo();
  }

  public getStringError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('pattern'))
      return "Este campo debe tener un formato valido";

    return "El campo debe contener más digitos";
  }

  public getEmailError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('email'))
      return "El campo debe tener un formato de email valido";

    return "El campo debe contener más digitos";
  }

  public save() {
    const dto = this.formToUpdateDto();
    this.update(dto);
  }

  private getAndSetFormInfo(): void {
    this._userService.getOne(this.id).pipe(untilDestroyed(this)).subscribe(user => {
      this.FirstName?.setValue(user.firstName);
      this.LastName?.setValue(user.lastName);
      this.Email?.setValue(user.email);
    });
  }

  private formToUpdateDto(): UserUpdateDto {
    return {
      id: this.id,
      firstName: this.FirstName?.value,
      lastName: this.LastName?.value,
      email: this.Email?.value,
    }
  }

  private update(dto: UserUpdateDto): void {
    this._userService.update(dto).pipe(
      tap((updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.userName} Actualizado`);
        this.goBack();
      }),
      catchError((error: string) => {
        this.showError(error);
        return throwError(error);
      }))
      .subscribe();
  }

  private showSuccess(message: string) {
    this._toastrService.success(message);
  }

  private showError(message: string) {
    this._toastrService.error(message);
  }

  private goBack() {
    this._location.back();
  }
}
