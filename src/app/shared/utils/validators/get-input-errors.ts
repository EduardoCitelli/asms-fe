import { ValidationErrors } from "@angular/forms";
import { maxErrorValue } from "./models/max-error-value";
import { minErrorValue } from "./models/min-error-value";
import { minMaxLengthErrorValue } from "./models/min-max-length-error-value";
import { patternErrorValue } from "./models/pattern-error-value";

const materialDateParseError = 'matDatepickerParse';
const materialDateParseErrorValue = 'Formato de fecha invalido';
const requiredError = 'Campo requerido';

const BASIC_VALIDATION_ERRORS: string[] = [
  'required',
  'email',
  'min',
  'max',
  'minlength',
  'maxlength',
  'pattern',
]

const BASIC_ERRORS_TO_SHOW = {
  required: () => requiredError,
  email: () => 'Formato de email invalido',
  min: (errorValue: minErrorValue) => `Por favor ingrese un valor mayor que ${errorValue.min}`,
  max: (errorValue: maxErrorValue) => `Por favor ingrese un valor menor que ${errorValue.max}`,
  minlength: (errorValue: minMaxLengthErrorValue) => `Menor cantidad de caracteres necesarios ${errorValue.requiredLength}, valor actual ${errorValue.actualLength}`,
  maxlength: (errorValue: minMaxLengthErrorValue) => `Cantidad maxima de caracteres superada ${errorValue.requiredLength}, valor actual ${errorValue.actualLength}`,
  pattern: (errorValue: patternErrorValue) => `Formato invalido, deberías respetar el siguiente patron: ${errorValue.requiredPattern}, valor actual: ${errorValue.actualValue}`,
}

/**
 * Use to get one error from the control component
 * @param controlErrors errors from the component
 * @returns obtained error
 */
export function getControlError(controlErrors: ValidationErrors | null): string {
  let errors: string[] = [];

  if (controlErrors) {
    Object.keys(controlErrors).forEach((keyError) => {
      if (keyError === materialDateParseError) {
        errors.push(materialDateParseErrorValue);
        return;
      }

      const error = BASIC_VALIDATION_ERRORS.includes(keyError) ? getBasicValidatorsValues(keyError as any, controlErrors[keyError]) : controlErrors[keyError];

      errors.push(typeof error === 'string' ? error : requiredError);
    })
  }

  let uniqueErrors = errors.filter((value, index, array) => array.indexOf(value) === index);

  let notRequiredErrors = uniqueErrors.filter(x => x !== requiredError);

  return notRequiredErrors.length > 0 ? notRequiredErrors[0] : uniqueErrors[0];
}

/**
 * use to get the error to show to the user when the component have a basic validator error
 * @param key key from the validation error
 * @param value value from the validation error
 * @returns Error to show to the user
 */
function getBasicValidatorsValues(key: 'required' | 'email' | 'min' | 'max' | 'minlength' | 'maxlength' | 'pattern', value: any): string {
  return BASIC_ERRORS_TO_SHOW[key](value);
}
