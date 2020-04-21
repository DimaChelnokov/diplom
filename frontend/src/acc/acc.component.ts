import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acc',
  templateUrl: './acc.component.html',
  styleUrls: ['./acc.component.css']
})
export class AccComponent implements OnInit {

  fio: string;
  username: string;
  password: string;
  email: string;
  role: number;
  group: string;

  constructor() { }

  ngOnInit(): void {
    this.role = 1;
    this.fio = '';
    this.username = '';
    this.password = '';
    this.email = '';
  }

  submit(): void {

  }
}
