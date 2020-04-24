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
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadUsers() {
      this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  editUser(user: User) {
    this.editedUser = new User(user.id, user.username, user.email, user.roleId, user.group_id);
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
          setTimeout(() => this.loadUsers(), 1000);
        },
        (error: any) => {
          if (error.status == 403) {
            alert('Вы не можете редактировать текущего пользователя!');
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
      setTimeout(() => this.loadUsers(), 1000);
    },
    (error: any) => {
      if (error.status == 403) {
        alert('Вы не можете удалить текущего пользователя!');
      }
    })
  }
}
