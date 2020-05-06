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

  login: string;
  pass: string;

  constructor(
    private serv: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void { 
    this.login = '';
    this.pass = '';
  }

  submit(): void {
    localStorage.removeItem('myAuthToken');
    this.serv.auth(this.login, this.pass).subscribe(
      (data: any) => {
        localStorage.setItem('myAuthToken', data.access_token);
        localStorage.setItem('myRole', data.role);
        if (data.role == 1) {
          this.router.navigate(['users']);
        } else {
          this.router.navigate(['sched']);
        }
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
