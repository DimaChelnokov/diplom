import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopicsComponent } from './topics.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TopicsComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TopicsModule { }
