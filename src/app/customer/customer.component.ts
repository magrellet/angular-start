import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder } from '@angular/forms';
import { Customer } from './customer';

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.customerForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      sendCatalog: true
    });

  }

  save() {
    console.log(this.customerForm);
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName:'Jack',
    });

  }
}
