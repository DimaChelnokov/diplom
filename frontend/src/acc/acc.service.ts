import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccService {

  private profile = '/api/users/current'
  private groups = '/api/groups'

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http.get(this.profile)
  }

  getGroups() {
    return this.http.get(this.groups)
  }

  changeProfile(data: any, groupId: number): Observable<Object> {
    return this.http.post(this.profile, {"fio": data.fio, "username": data.username, "password": data.password, "email": data.mail, "group_id": groupId});
  }
}
