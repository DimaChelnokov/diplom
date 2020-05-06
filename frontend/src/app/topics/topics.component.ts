import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TopicsService } from './topics.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Topic } from './topic';
import { Task } from './task';

@Component({
  selector: 'app-topics',
  providers: [TopicsService],
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})
export class TopicsComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  id: number;
  topics: Array<Topic>;
  isNewRecord: boolean;
  editedTopic: Topic;
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private serv: TopicsService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.topics = new Array<Topic>();
    this.isNewRecord = false;
    this.task = null;
  }

  ngOnInit(): void {
    this.loadTask();
  }

  private loadTask() {
    this.serv.getTask(this.id).subscribe((data: Task) => {
      this.task = data;
      this.loadTopics();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
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

  loadTemplate(it: Topic) {
    if (this.isNewRecord && !it.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  deleteTopic(topic: Topic) {
    if (confirm("Удалить слайд?")) {
      this.serv.deleteTopic(topic.id).subscribe(data => {
          this.cancel();
          setTimeout(() => this.loadTopics(), 2000);
      });
    }
  }

  cancel() {
    this.isNewRecord = false;
    this.editedTopic = null;
    this.topics.pop();
  }

  addTopic() {
    this.editedTopic = new Topic(null, this.id, '', false, 0);
    this.isNewRecord = true;
    this.topics.push(this.editedTopic);
  }

  createTopic() {
    this.serv.createTopic(this.editedTopic).subscribe((data: Topic) => {
      this.editedTopic.id = data.id;
      this.isNewRecord = false;
      this.editedTopic = null;
    });
  }

  goTo(topic: Topic) {
    this.router.navigate(['topic/' + topic.id]);
  }
}
