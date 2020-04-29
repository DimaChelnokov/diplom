import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolvedComponent } from './solved.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SolvedComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SolvedModule { }
