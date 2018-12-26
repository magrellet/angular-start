import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Customer } from './customer';
import { debounceTime } from 'rxjs/operators';

//custom validator
/*function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != null && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { 'range': true }
  }
  return null;
}
*/

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value != null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return { 'range': true }
    }
    return null;
  };
}

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { 'match': true };

}

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();
  emailMessage: string;

  private validationMessages = {
    required: 'Please enter you email address.',
    email: 'please enter a valid email address.'
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.customerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],

      emailGroup: this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', [Validators.required]],
      }, { validator: emailMatcher }),

      phone: '',
      notifications: 'email',
      //rating: [null, ratingRange],
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true
    });

    this.customerForm.get('notifications').valueChanges.subscribe(value => this.setNotifications(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges.pipe(debounceTime(1000)).subscribe(value => this.setMessage(emailControl));

  }

  save() {
    console.log(this.customerForm);
    console.log('Saved; ' + JSON.stringify(this.customerForm.value))
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(key => this.emailMessage += this.validationMessages[key]).join('');
    }
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Smith',
      email: 'm@m.com'
    });
  }

  setNotifications(notifyVia: string): void {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    }
    else {
      phoneControl.clearValidators;
    }
    phoneControl.updateValueAndValidity();
  }
}
