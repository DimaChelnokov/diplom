import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SchedService {

  private tasks = '/api/schedules';
  
  constructor(private http: HttpClient) {  }

  getTasks() {
    return this.http.get(this.tasks);
  }
}
