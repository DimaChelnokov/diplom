import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [UsersComponent],
  exports: [ UsersComponent ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule, 
    HttpClientModule
  ]
})
export class UsersModule { }
