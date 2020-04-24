import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Group } from '../acc/group';

@Injectable()
export class GroupsService {

  private url = '/api/groups';
  constructor(private http: HttpClient) {}

  getGroups() {
    return this.http.get(this.url);
  }

  createGroup(group: Group) {
    return this.http.post(this.url, group);
  }

  updateGroup(id: number, group: Group) {
    return this.http.post(this.url + '/' + id, group);
  }

  deleteGroup(id: number) {
    return this.http.delete(this.url + '/' + id);
  }
}
