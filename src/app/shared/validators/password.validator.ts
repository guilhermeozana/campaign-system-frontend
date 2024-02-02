import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class PasswordValidator {

  static notEqualsTo: ValidatorFn = (group: AbstractControl):  ValidationErrors | null => {
    let pass = group.get('novaSenha')!.value;
    let confirmPass = group.get('confirmacaoNovaSenha')!.value
    return pass === confirmPass ? null : { notSame: true }
  }
}
