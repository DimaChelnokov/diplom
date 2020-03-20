import { TemplateRef, ViewChild } from '@angular/core'
import { Component, OnInit } from '@angular/core'
import { User } from './user'
import { UserService } from './user.service'
import { Observable } from 'rxjs'

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  providers: [UserService]
})
export class AppComponent implements OnInit {
  @ViewChild('readOnlyTemplate', { static: false })
  readOnlyTemplate: TemplateRef<any>
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>

  editedUser: User
  users: Array<User>
  isNewRecord: boolean
  statusMessage: string

  constructor(private serv: UserService) {
    this.users = new Array<User>()
  }

  ngOnInit() {
    this.loadUsers()
  }

  private loadUsers() {
    this.serv.getUsers().subscribe((data: User[]) => {
      this.users = data
    })
  }

  addUser() {
    this.editedUser = new User(0, '', 1)
    this.users.push(this.editedUser)
    this.isNewRecord = true
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
