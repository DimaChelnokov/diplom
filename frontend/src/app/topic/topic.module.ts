import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicComponent } from './topic.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopicComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TopicModule { }
