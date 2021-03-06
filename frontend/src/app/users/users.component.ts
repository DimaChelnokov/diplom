import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { Group } from './group';

@Component({
  selector: 'users',
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  editedUser: User;
  users: Array<User>;
  groups: Array<Group>;

  constructor(
    private serv: UserService,
    private router: Router
  ) {
    this.users = new Array<User>();
    this.groups = new Array<Group>();
    this.editedUser = null;
  }

  ngOnInit(): void {
    this.loadGroups();
  }

  private loadGroups() {
    this.serv.getGroups().subscribe((data: Group[]) => {
      this.groups = data;
      this.loadUsers();
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['auth']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  private loadUsers() {
      this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data;
    },
    (error: any) => {
      let status = error.status;
      if ([401, 403].includes(status)) {
        this.router.navigate(['auth']);
      } else {
        alert("Error: " + status);
      }
    });
  }

  editUser(user: User) {
    this.editedUser = user;
  }

  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.id == user.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  saveUser() {
      this.serv
        .updateUser(this.editedUser.id, this.editedUser)
        .subscribe(data => {
          setTimeout(() => this.loadUsers(), 2000);
        },
        (error: any) => {
          let status = error.status;
          if (error.status == 403) {
            alert('Вы не можете редактировать текущего пользователя!');
          } else if (status == 401) {
            this.router.navigate(['auth']);
          } else {
            alert("Error: " + status);
          }
        })
      this.editedUser = null;
  }

  cancel() {
    this.editedUser = null;
  }

  deleteUser(user: User) {
    if (!confirm("Удалить пользователя?")) return;
    this.serv.deleteUser(user.id).subscribe(data => {
      setTimeout(() => this.loadUsers(), 2000);
    },
    (error: any) => {
      let status = error.status;
      if (error.status == 403) {
        alert('Вы не можете удалить текущего пользователя!');
      } else if (status == 401) {
        this.router.navigate(['auth']);
      } else {
        alert("Error: " + status);
      }
    });
  }
}
