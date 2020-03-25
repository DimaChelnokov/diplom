import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;

  constructor(private serv: AuthService) { }

  ngOnInit(): void { 
    this.username = '';
    this.password = '';
  }

  submit(): void {
    this.serv.auth(this.username, this.password).subscribe(
      (data: any) => {
        console.log(data);
        localStorage.setItem('myAuthToken', data.access_token);
        alert("Token: " + data.access_token);
      },
      (error: any) => {
        let status = error.status;
        alert("Error: " + status);
      })
  }

}
