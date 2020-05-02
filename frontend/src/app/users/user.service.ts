import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from './user'

@Injectable()
export class UserService {

  private users = '/api/users';
  private groups = '/api/groups';

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.users);
  }

  getGroups() {
    return this.http.get(this.groups);
  }

  updateUser(id: number, user: User) {
    return this.http.post(this.users + '/id/' + id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.users + '/id/' + id);
  }
}
