import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Answer } from './answer';

@Injectable()
export class SlideService {

  private slide = '/api/schedules';
  private items = '/api/schedules/slide';
  private answers = '/api/answers/current';

  constructor(private http: HttpClient) { }

  getSlide(id: number) {
    return this.http.get(this.slide + '/' + id);
  }

  getItems(id: number) {
    return this.http.get(this.items + '/' + id);
  }

  getResults(id: number) {
    return this.http.get(this.answers + '/' + id);
  }

  setResults(results: Answer[]) {
    return this.http.post(this.answers, results);
  }
}
