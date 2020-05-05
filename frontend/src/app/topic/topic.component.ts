import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TopicService } from './topic.service';
import { Topic } from './topic';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from './item';

@Component({
  selector: 'app-topic',
  providers: [TopicService],
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.css']
})
export class TopicComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;

  id: number;
  topic: Topic;
  isChanged: boolean;
  items: Array<Item>;
  isNewRecord: boolean;
  editedItem: Item;

  constructor(
    private route: ActivatedRoute,
    private serv: TopicService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.topic = new Topic(this.id, null, '', '', '');
    this.isChanged = false;
    this.items = new Array<Item>();
    this.isNewRecord = false;
    this.editedItem = null;
  }

  ngOnInit(): void {
    this.loadTopic();
  }

  private loadTopic() {
    this.serv.getTopic(this.id).subscribe((data: Topic) => {
      this.topic = data;
      this.loadItems();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadItems() {
    this.serv.getItems(this.id).subscribe((data: Item[]) => {
      this.items = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  onChanged() {
    this.isChanged = true;
  }

  saveTopic() {
    this.serv.saveTopic(this.topic).subscribe((data: Topic) => {
      this.topic = data;
      this.isChanged = false;
    })
  }

  loadTemplate(it: Topic) {
    return this.readOnlyTemplate;
  }
}
