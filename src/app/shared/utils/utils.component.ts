import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";
import * as moment from "moment";

export function getFormatedCep(value: string): any {
    const data = value
        ? `${value.substring(0, 2)}.${value.substring(
              2,
              5
          )}-${value.substring(5, 8)}`
        : null;

    return data;
}

export function formatterDate(data: any[]):any{
    return `${data[2].split("T")[0]}/${data[1]}/${data[0]}`;
}

export function formatterDateGeneric(data: any, dateFormat: any):any {
    return (moment(data)).format(dateFormat)
}

export function dataURItoBlob(dataURI:string) {

    let byteString = atob(dataURI.split(',')[1]);

    let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    let ab = new ArrayBuffer(byteString.length);

    let ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    let blob = new Blob([ab], {type: mimeString});
    return blob;

}

export function formatterDateToLocalDate(date:string):any{
    let newData = moment(date, "DD/MM/YYYY");

    return newData.format("YYYY-MM-DDT00:00:00");
}


export function getFormatedCpf(value: string):any{
    const data = value
        ? `${value.substring(0, 3)}.${value.substring(3,6)}.${value.substring(6, 9)}-${value.substring(9, 11)}`
        : null;
    return data;
}


export function getFormatedMatricula(value: string):any{
    const data = value
        ? `${value.substring(0, 2)}.${value.substring(2,5)}.${value.substring(5, 8)}-${value.substring(8, 9)}`
        : null;
    return data;

}

export function validaCpfString(cpfValue: string): boolean {
    const cpf = cpfValue.replace(/\D/g, "");

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf == '00000000000' ||
      cpf == '11111111111' ||
      cpf == '22222222222' ||
      cpf == '33333333333' ||
      cpf == '44444444444' ||
      cpf == '55555555555' ||
      cpf == '66666666666' ||
      cpf == '77777777777' ||
      cpf == '88888888888' ||
      cpf == '99999999999' ||
      !regex.test(cpf)
    )
      valido = false;
    else {
      for (let i = 1; i <= 9; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(9, 10))) valido = false;

      soma = 0;
      for (let i = 1; i <= 10; i++)
        soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;

      if (resto == 10 || resto == 11) resto = 0;
      if (resto != parseInt(cpf.substring(10, 11))) valido = false;
      valido = true;
    }

    if (valido) return true;
    else return false;
}

export function validaCpf(controle: FormControl) {
    const cpf = controle.value;
    let valido: boolean = validaCpfString(cpf);

    if (valido) return null;
    else return { cpfInvalido: true };
}

export function genUniqueId(): string {
    const dateStr = Date
      .now()
      .toString(36); // convert num to base 36 and stringify

    const randomStr = Math
      .random()
      .toString(36)
      .substring(2, 8); // start at index 2 to skip decimal point

    return `${dateStr}-${randomStr}`;
}

export function FormatString(str: string, ...val: string[]) {
    for (let index = 0; index < val.length; index++) {
        str = str.replace(`{${index}}`, val[index]);
    }
    return str;
}

export function compareDates(date1: Date, date2: Date) {
    if (date1 < date2) return -1;
    if (date1 > date2) return 1;
    return 0; // dates are equal
}


export function formataMoedaReal(value: number | bigint) {
    let real = Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return real.format(value);
}
