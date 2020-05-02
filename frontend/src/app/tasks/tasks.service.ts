import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TasksService {

  private tasks = '/api/tasks';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.tasks);
  }

  deleteTask(id: number) {
    return this.http.delete(this.tasks + '/' + id);
  }
}
