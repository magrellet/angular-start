import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [CustomerComponent],
    imports: [
        RouterModule.forChild([
            { path: 'customer', component: CustomerComponent },            
        ]),]

})

export class CustomerModule { }