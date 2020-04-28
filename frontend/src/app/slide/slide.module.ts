import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideComponent } from './slide.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SlideModule { }
