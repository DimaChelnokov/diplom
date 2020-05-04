import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TopicsService } from './topics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Topic } from './topic';

@Component({
  selector: 'app-topics',
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;

  id: number;
  topics: Array<Topic>;

  constructor(
    private route: ActivatedRoute,
    private serv: TopicsService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.topics = new Array<Topic>();
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  private loadTopics() {
    this.serv.getTopics(this.id).subscribe((data: Topic[]) => {
      this.topics = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  loadTemplate(topic: Topic) {
    return this.readOnlyTemplate;
  }

  deleteTopic(topic: Topic) {
    if (confirm("Удалить слайд?")) {
      this.serv.deleteTopic(topic.id).subscribe(data => {
          setTimeout(() => this.loadTopics(), 2000);
      });
    }
  }
}
