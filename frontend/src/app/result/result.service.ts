import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grade } from './grade';

@Injectable()
export class ResultService {

  private slide = '/api/schedules';
  private items = '/api/schedules/slide';
  private answers = '/api/answers/student';
  private grades = '/api/gradetypes';
  private grade = '/api/grades';

  constructor(private http: HttpClient) { }

  getSlide(id: number) {
    return this.http.get(this.slide + '/' + id);
  }

  getItems(id: number) {
    return this.http.get(this.items + '/' + id);
  }

  getResults(student: number, id: number) {
    return this.http.get(this.answers + '/' + student + '/' + id);
  }

  getGrades(id: number) {
    return this.http.get(this.grades + '/' + id);
  }

  setGrade(student: number, id: number, grade: Grade) {
    grade.student_id = student;
    grade.task_id = id;
    return this.http.post(this.grade, grade);
  }
}
