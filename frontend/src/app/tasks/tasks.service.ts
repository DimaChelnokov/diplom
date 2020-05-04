import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Task } from './task';

@Injectable()
export class TasksService {

  private tasks = '/api/tasks';
  private gradetypes = '/api/gradetypes';

  constructor(private http: HttpClient) { }

  getGradeTypes() {
    return this.http.get(this.gradetypes);
  }

  getTasks() {
    return this.http.get(this.tasks);
  }

  createTask(task: Task) {
    return this.http.post(this.tasks, task);
  }

  updateGroup(id: number, task: Task) {
    return this.http.post(this.tasks + '/' + id, task);
  }

  deleteTask(id: number) {
    return this.http.delete(this.tasks + '/' + id);
  }
}
