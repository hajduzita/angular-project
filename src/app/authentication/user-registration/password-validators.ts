import {AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidators {

  static patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if control is empty return no error
      if (!control.value) {
        return null;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error else return error passed in the second parameter
      return valid ? null : error;
    };
  }

}
