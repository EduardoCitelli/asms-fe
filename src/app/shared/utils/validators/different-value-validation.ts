import { AbstractControl, ValidatorFn } from "@angular/forms";

/**
 * Use to validate to control that should have different values
 * @param comparationControl control to compare with
 * @param comparationControlName name of control to compare with
 * @returns validation
 */
export function differentValueValidation(comparationControl: AbstractControl, comparationControlName: string) : ValidatorFn {
  return (control: AbstractControl)  => {
    if (!control.value || !comparationControl.value)
      return null;

    if (control.value == comparationControl.value)
      return {shouldBeDifferentValidation: `El valor debe ser diferente al campo ${comparationControlName}`}

    return null;
  }
}
