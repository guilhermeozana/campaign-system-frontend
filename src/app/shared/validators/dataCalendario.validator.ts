import { AbstractControl } from "@angular/forms";

export class DataCalendario {
    static valid(control: AbstractControl) {

        const data = control.value;
        const dia = parseInt(data.substr(0, 2), 10);
        const mes = parseInt(data.substr(2, 2), 10);
        const ano = parseInt(data.substr(4, 4), 10);

        // Verifica se o dia, mês e ano são válidos
        const dataValida = !isNaN(dia) && !isNaN(mes) && !isNaN(ano) &&
            dia >= 1 && dia <= 31 &&
            mes >= 1 && mes <= 12 &&
            ano >= 1900 && ano <= 2100;

        return dataValida ? null : { dataInvalida: true };
    };
}