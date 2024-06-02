import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Handle identification number validation
 * @returns validation error value
 */
export function identificationNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    var patt = new RegExp("^[0-9]{2}-?[0-9]{8}-?[0-9]{1}?$");
    const match = patt.test(control.value);

    if (!match)
      return { identificationNumberValidator: 'Este campo debe tener un formato valido' };

    return null;
  }
}
