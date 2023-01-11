import { Directive, HostBinding, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[mgdPasswordStrengthMeter]'
})
export class PasswordStrengthMeterDirective implements OnChanges{

  @Input() password!: string;
  @HostBinding('attr.data-score') score!: number;

  constructor() { }

  ngOnChanges() { this.strength() }

  private strength(): void {

    this.score = 0;

    if (this.password) {
      this.score++;

      // get the min length
      if (this.password.length > 7) {
        this.score++;
      }

      // contain special character
      if (new RegExp(/[^A-Za-z0-9]/).test(this.password)) {
        this.score++;
      }

      // contain number
      if (new RegExp(/\d/).test(this.password)) {
        this.score++;
      }

      // contain uppercase letter
      if (new RegExp(/[A-Z]/).test(this.password)) {
        this.score++;
      }

    }
  }

}
