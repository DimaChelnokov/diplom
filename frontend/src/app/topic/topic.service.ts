import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from './topic';

@Injectable()
export class TopicService {

  private topic = '/api/tasks/topic';
  private items = '/api/tasks/items';

  constructor(private http: HttpClient) { }

  getTopic(id: number) {
    return this.http.get(this.topic + '/' + id);
  }

  saveTopic(topic: Topic) {
    return this.http.post(this.topic, topic);
  }

  getItems(id: number) {
    return this.http.get(this.items + '/' + id);
  }
}
