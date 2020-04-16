import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegComponent } from './reg.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RegComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class RegModule { }
