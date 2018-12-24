import { NgModule } from "@angular/core";
import { CustomerComponent } from "./customer.component";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";

@NgModule({
    declarations: [CustomerComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        BrowserModule,
        RouterModule.forChild([
            { path: 'customer', component: CustomerComponent },            
        ]),
        SharedModule
    ],
})

export class CustomerModule { }