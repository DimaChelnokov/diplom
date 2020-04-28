import { Component, OnInit } from '@angular/core';
import { SlideService } from './slide.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Slide } from './slide';
import { Answer } from './answer';

@Component({
  selector: 'app-slide',
  providers: [SlideService],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  id: number;
  slide: Slide;
  answers: Array<Answer>;

  constructor(
    route: ActivatedRoute,
    private serv: SlideService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.slide = new Slide(0, '', 0, '', '', false, null, null);
    this.answers = Array<Answer>();
  }

  ngOnInit(): void {
    this.loadAnswers();
  }

  private loadAnswers() {
    this.serv.getAnswers(this.id).subscribe((data: Answer[]) => {
      this.answers = data;
      this.loadSlide();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadSlide() {
    this.serv.getSlide(this.id).subscribe((data: Slide) => {
      this.slide = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  goTo(id: number) { 
    this.router.navigate(['slide/' + id]);
    this.id = id;
    this.loadAnswers();
  }
}
