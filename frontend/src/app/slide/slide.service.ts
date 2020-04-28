import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SlideService {

  private slide = '/api/schedules';
  private answers = '/api/schedules/slide';

  constructor(private http: HttpClient) { }

  getSlide(id: number) {
    return this.http.get(this.slide + '/' + id);
  }

  getAnswers(id: number) {
    return this.http.get(this.answers + '/' + id);
  }
}
