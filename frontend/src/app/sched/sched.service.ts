import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchedService {

  private tasks = '/api/schedules';
  private grades = '/api/gradetypes';

  constructor(private http: HttpClient) {  }

  getTasks() {
    return this.http.get(this.tasks);
  }

  getGrades() {
    return this.http.get(this.grades);
  }
}
