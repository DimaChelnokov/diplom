import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { User } from './user';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'users',
  providers: [UserService],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  editedUser: User
  users: Array<User>
  isNewRecord: boolean
  statusMessage: string

  constructor(
    private serv: UserService,
    private router: Router
  ) {
    this.users = new Array<User>()
  }

  ngOnInit(): void {
    this.loadUsers()
  }

  private loadUsers() {
    this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  editUser(user: User) {
    this.editedUser = new User(user.id, user.username, user.roleId)
  }

  loadTemplate(user: User) {
    if (this.editedUser && this.editedUser.id == user.id) {
      return this.editTemplate
    } else {
      return this.readOnlyTemplate
    }
  }

  saveUser() {
    if (this.isNewRecord) {
      this.serv.createUser(this.editedUser).subscribe(data => {
        ;(this.statusMessage = 'Данные успешно добавлены'), this.loadUsers()
      })
      this.isNewRecord = false
      this.editedUser = null
    } else {
      this.serv
        .updateUser(this.editedUser.id, this.editedUser)
        .subscribe(data => {
          ;(this.statusMessage = 'Данные успешно обновлены'), this.loadUsers()
        })
      this.editedUser = null
    }
  }

  cancel() {
    if (this.isNewRecord) {
      this.users.pop()
      this.isNewRecord = false
    }
    this.editedUser = null
  }

  deleteUser(user: User) {
    this.serv.deleteUser(user.id).subscribe(data => {
      ;(this.statusMessage = 'Данные успешно удалены'), this.loadUsers()
    })
  }
}
