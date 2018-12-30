import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
  ],
  exports:[
    StarComponent,
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
