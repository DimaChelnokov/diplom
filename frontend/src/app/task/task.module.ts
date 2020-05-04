import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskComponent } from './task.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [TaskComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TaskModule { }
