import { AbstractControl } from "@angular/forms";

export class NomeCompleto {
    static valid(control: AbstractControl) {

        const value: string = control.value;

        if (value && value.indexOf(' ') === -1) {
            return { nomeCompletoInvalido: true };
        }

        const elementos: string[] = value.split(' ');

        if (elementos.length < 2 || elementos.some(part => part.length < 2)) {
            return { nomeCompletoInvalido: true };
        }

        return null;
    };

}