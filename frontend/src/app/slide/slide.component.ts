import { Component, OnInit } from '@angular/core';
import { SlideService } from './slide.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Slide } from './slide';
import { Answer } from './answer';
import { Result } from './result';

@Component({
  selector: 'app-slide',
  providers: [SlideService],
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  id: number;
  slide: Slide;
  items: Array<Answer>;
  results: Array<Result>;

  constructor(
    route: ActivatedRoute,
    private serv: SlideService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.slide = new Slide(0, '', 0, '', '', false, null, null, null);
    this.items = Array<Answer>();
    this.results = Array<Result>();
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
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    });
  }

  private loadResults() {
    this.serv.getResults(this.id).subscribe((data: Result[]) => {
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
    this.router.navigate(['slide/' + id]);
    this.id = id;
    this.loadResults();
  }

  onChanged(a: Answer) {
    if (this.slide.is_radio) {
        this.items.forEach((it) => {
          it.is_checked = it.id == a.id;
        });
    } else {
      this.items.forEach((it) => {
        if (it.id == a.id) {
          it.is_checked = !it.is_checked;
        }
      });
    }
    this.serv.setResults(this.items).subscribe((data: Result[]) => {
      this.loadResults();
    });
  }
}
