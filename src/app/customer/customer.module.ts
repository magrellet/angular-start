import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [CustomerComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,        
        RouterModule.forChild([
            { path: 'customer', component: CustomerComponent },            
        ]),
        SharedModule
    ],
    

})

export class CustomerModule { }