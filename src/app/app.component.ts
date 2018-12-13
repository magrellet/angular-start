import { Component } from "@angular/core";

@Component({
  selector: 'pm-root', //product management
  template: `<div>
    <h1>{{pageTittle}}</h1>
    <pm-products></pm-products>
  </div>`
})

export class AppComponent {
  pageTittle: string = 'Acme Product Management';
}