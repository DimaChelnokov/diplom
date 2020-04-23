import { NgModule } from '@angular/core';
import { GroupsComponent } from './groups.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [GroupsComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class GroupsModule { }
