import { Directive, input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appReservado]',
  providers: [
    {
      provide: NG_VALIDATORS, 
      useExisting: ReservadoDirective,
      multi: true
    }
  ],
})
export class ReservadoDirective implements Validator {

  public nombreReservado = input<string>('', {alias: 'appReservado'});

  constructor() { }
  validate(control: AbstractControl): ValidationErrors | null {
    console.log({
      reservado : this.nombreReservado(),
      valueForm : control.value
    });
    return this.nombreReservado() != control.value ? null : { appReservado : true }
  }
}
