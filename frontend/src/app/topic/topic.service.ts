import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from './topic';
import { Item } from './item';

@Injectable()
export class TopicService {

  private topic = '/api/tasks/topic';
  private items = '/api/tasks/items';
  private upload = '/api/upload';

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

  createItem(it: Item) {
    return this.http.post(this.items, it);
  }

  deleteItem(id: number) {
    return this.http.delete(this.items + '/' + id);
  }

  uploadFile(formData: FormData) {
    return this.http.post(this.upload, formData);
  }
}
