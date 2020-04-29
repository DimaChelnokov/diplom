import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SolvedService {

  private tasks = '/api/schedules/solved';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.tasks);
  }
}
