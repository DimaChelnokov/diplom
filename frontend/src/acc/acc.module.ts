import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccComponent } from './acc.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccService } from './acc.service';

@NgModule({
  declarations: [AccComponent],
  providers: [AccService],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class AccModule { }
