import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

/**
 * Handle phone number validation
 * @returns validation error value
 */
export function phoneValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    var patt = new RegExp("^((\\+91-?)|0)?[0-9]{10}$");
    const match = patt.test(control.value);

    if (!match)
      return { phoneValidator: 'Formato de telefono invalido' };

    return null;
  }
}
