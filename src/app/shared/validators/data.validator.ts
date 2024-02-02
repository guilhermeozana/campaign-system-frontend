import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class DataValidators {
    static greaterThan(startControl: AbstractControl): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
          const startDate: Date = startControl.value;
          const endDate: Date = endControl.value;

          if (!startDate || !endDate) {
            return null;
          }
          if (startDate >= endDate) {
            return { greaterThan: true };
          }
          return null;
        };
      }

      static greaterThanOrEqualsTo(startControl: AbstractControl): ValidatorFn {
        return (endControl: AbstractControl): ValidationErrors | null => {
          const startDate: Date = startControl.value;
          const endDate: Date = endControl.value;

          if (!startDate || !endDate) {
            return null;
          }
          if (startDate > endDate) {
            return { greaterThan: true };
          }
          return null;
        };
      }
  }
