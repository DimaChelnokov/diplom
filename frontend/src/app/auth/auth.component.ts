import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [AuthService]
})
export class AuthComponent implements OnInit {

  username: string;
  password: string;

  constructor(
    private serv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.username = '';
    this.password = '';
  }

  submit(): void {
    localStorage.removeItem('myAuthToken');
    this.serv.auth(this.username, this.password).subscribe(
      (data: any) => {
        localStorage.setItem('myAuthToken', data.access_token);
        this.router.navigate(['']);
      },
      (error: any) => {
        let status = error.status;
        if (status == 401) {
            alert("Логин или пароль не найден");
        } else {
            alert("Error: " + status);
        }
      })
  }

}
