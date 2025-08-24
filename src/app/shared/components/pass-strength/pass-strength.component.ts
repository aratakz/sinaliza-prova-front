import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pass-strength',
  standalone: false,
  templateUrl: './pass-strength.component.html',
  styleUrl: './pass-strength.component.scss'
})
export class PassStrengthComponent implements OnChanges {

  @Input() showPassStrength: boolean = false;
  @Input() password: string = '';

  hasMinlength:boolean = false;
  hasUpperLetter:boolean = false;
  hasLowerLetter:boolean = false;
  hasNumber:boolean = false;
  hasSpecialChars:boolean = false;

  passStatus = '';
  passStrength:number= 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.hasMinlength = this.password.length >= 8;
    this.hasLowerLetter = !!this.password.match(/[a-z]+/);
    this.hasUpperLetter = !!this.password.match(/[A-Z]+/);
    this.hasNumber = !!this.password.match(/[0-9]+/);
    this.hasSpecialChars = !!this.password.match(/[$@#&!]+/);

    this.passStrength = 0;

    if (this.hasMinlength) {
      this.passStrength = this.passStrength + 20;
    }
    if (this.hasLowerLetter) {
      this.passStrength = this.passStrength + 20;
    }
    if (this.hasUpperLetter) {
      this.passStrength = this.passStrength + 20;
    }
    if (this.hasNumber) {
      this.passStrength = this.passStrength + 20;
    }
    if (this.hasSpecialChars) {
      this.passStrength = this.passStrength + 20;
    }


    this.passStatus = '';
    if (this.passStrength <=  33.3) {
      this.passStatus =  'weak';
    }
    if (this.passStrength > 33.3 && this.passStrength <=  66.6) {
      this.passStatus =  'moderate';
    }
    if (this.passStrength > 66.6 && this.passStrength <=  100) {
      this.passStatus =  'strong';
    }


    console.debug('passStrength', this.passStrength);
  }

}
