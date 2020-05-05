import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Attach } from './attach';

@Injectable()
export class AttachsService {

  private url = '/api/groups/attached';
  private task = '/api/tasks';

  constructor(private http: HttpClient) { }

  getAttaches(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  attach(attach: Attach) {
    return this.http.post(this.url, attach);
  }

  detach(id: number) {
    return this.http.delete(this.url + '/' + id);
  }

  getTask(id: number) {
    return this.http.get(this.task + '/' + id);
  }
}
