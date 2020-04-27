import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchedComponent } from './sched.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [SchedComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SchedModule { }
