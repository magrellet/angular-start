import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    StarComponent
  ],
  imports: [
    CommonModule,
    BrowserModule
  ],
  exports:[
    StarComponent,
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
