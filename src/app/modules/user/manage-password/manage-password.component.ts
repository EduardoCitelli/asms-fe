import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap, throwError } from 'rxjs';
import { MyUserService } from 'src/app/core/services/my-user.service';
import { UpdateMyPasswordDto } from 'src/app/shared/interfaces/dtos/my-user/update-my-password-dto';
import { ConfirmedValidator } from 'src/app/shared/utils/confirmed.validator';

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'app-manage-password',
  templateUrl: './manage-password.component.html',
  styleUrls: ['./manage-password.component.css']
})
export class ManagePasswordComponent {
  public readonly oldPasswordNameProperty: string = 'oldPassword';
  public readonly passwordNameProperty: string = 'password';
  public readonly confirmPasswordNameProperty: string = 'confirmPassword';

  form: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    private _myUserService: MyUserService,
    private _toastrService: ToastrService,
  ) {
    this.form = this._formBuilder.group({
      oldPassword: new FormControl<string | undefined>(undefined, [Validators.required]),
      password: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(7)]),
      confirmPassword: new FormControl<string | undefined>(undefined, [Validators.required, Validators.minLength(7)]),
    }, { validator: ConfirmedValidator(this.passwordNameProperty, this.confirmPasswordNameProperty) });
  }

  get OldPassword() { return this.form.get(this.oldPasswordNameProperty); }
  get Password() { return this.form.get(this.passwordNameProperty); }
  get ConfirmPassword() { return this.form.get(this.confirmPasswordNameProperty); }

  public getStringError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('pattern'))
      return "Este campo debe tener un formato valido";

    return "El campo debe contener más digitos";
  }

  public getConfirmError(control: AbstractControl | null) {
    if (control?.hasError('required'))
      return "Este campo es obligatorio";

    if (control?.hasError('pattern'))
      return "Este campo debe tener un formato valido";

    if (control?.hasError('confirmedValidator'))
      return "Los campos con las nuevas contraseñas deben coincidir";

    return "El campo debe contener más digitos";
  }


  public save() {
    const dto: UpdateMyPasswordDto = {
      oldPassword: this.OldPassword?.value,
      password: this.Password?.value,
    }

    this._myUserService.updatePassword(dto).pipe(
      tap((response) => {
        if (response)
          this.showSuccess(`Contraseña Actualizada`);
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
