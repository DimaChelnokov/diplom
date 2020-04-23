import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { User } from './user'

@Injectable()
export class UserService {

  private url = '/api/users'
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(this.url);
  }

  createUser(user: User) {
    return this.http.post(this.url, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put(this.url + '/' + id, user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
