import { Component, OnInit } from '@angular/core';
import { ResultService } from './result.service';
import { Slide } from './slide';
import { Answer } from './answer';
import { Result } from './result';
import { ActivatedRoute, Router } from '@angular/router';
import { Grade } from './grade';
import { GradeType } from './gradetype';

@Component({
  selector: 'app-result',
  providers: [ResultService],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  student: number;
  id: number;
  slide: Slide;
  items: Array<Answer>;
  results: Array<Result>;
  grade: Grade;
  grades: Array<GradeType>;

  constructor(
    route: ActivatedRoute,
    private serv: ResultService,
    private router: Router
  ) { 
    this.student = route.snapshot.params.student;
    this.id = route.snapshot.params.id;
    this.slide = new Slide(0, '', 0, '', '', false, null, null, null, null);
    this.items = Array<Answer>();
    this.results = Array<Result>();
    this.grade = new Grade(null, '', null, null);
    this.grades = new Array<GradeType>();
  }

  ngOnInit(): void {
    this.loadResults();
  }

  private isChecked(id: number): boolean {
    return this.results.filter((r: Result) => {
      return r.item_id == id && r.is_checked;
    }).length > 0;
  }

  private loadItems() {
    this.serv.getItems(this.id).subscribe((data: Answer[]) => {
      this.items = data;
      this.items.forEach((it: Answer) => {
        it.is_checked = this.isChecked(it.id);
      });
      this.loadSlide();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    });
  }

  private loadSlide() {
    this.serv.getSlide(this.id).subscribe((data: Slide) => {
      this.slide = data;
      this.loadGrades(this.slide.gradetype_id);
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    });
  }

  private loadGrades(id: number) {
    this.serv.getGrades(id).subscribe((data: GradeType[]) => {
      this.grades = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    });
  }

  private loadResults() {
    this.serv.getResults(this.student, this.id).subscribe((data: Result[]) => {
      this.results = data;
      this.loadItems();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    });
  }

  goTo(id: number) { 
    this.router.navigate(['res/' + this.student + '/' + id]);
    this.id = id;
    this.loadResults();
  }

  save(grade: Grade) {
    this.serv.setGrade(this.student, this.slide.task_id, grade).subscribe(data => {
      this.router.navigate(['solved']);
    });
  }
}
