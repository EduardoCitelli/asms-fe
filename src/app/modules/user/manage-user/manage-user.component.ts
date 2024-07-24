import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { MyUserService } from 'src/app/core/services/my-user.service';
import { UpdateMyUserDto } from 'src/app/shared/interfaces/dtos/my-user/update-my-user-dto';

@UntilDestroy({checkProperties: true})
@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit{
  public readonly firstNameProperty: string = 'firstName';
  public readonly lastNameProperty: string = 'lastName';
  public readonly emailProperty: string = 'email';

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _myUserService: MyUserService,
    private _toastrService: ToastrService,
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
    const currentUser = this._authService.currentUser();
    this.FirstName?.setValue(currentUser?.firstName);
    this.LastName?.setValue(currentUser?.lastName);
    this.Email?.setValue(currentUser?.email);
  }

  private formToUpdateDto(): UpdateMyUserDto {
    return {
      firstName: this.FirstName?.value,
      lastName: this.LastName?.value,
      email: this.Email?.value,
    }
  }

  private update(dto: UpdateMyUserDto): void {
    this._myUserService.updateUser(dto).pipe(
      tap((updatedUser) => {
        this.showSuccess(`Usuario ${updatedUser.userName} Actualizado`);
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
}
