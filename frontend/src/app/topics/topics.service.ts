import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Topic } from './topic';

@Injectable()
export class TopicsService {

  private topics = '/api/tasks/topics';
  private task = '/api/tasks';

  constructor(private http: HttpClient) { }

  getTopics(id: number) {
    return this.http.get(this.topics + '/' + id);
  }

  createTopic(topic: Topic) {
    return this.http.post(this.topics, topic);
  }

  deleteTopic(id: number) {
    return this.http.delete(this.topics + '/' + id);
  }

  getTask(id: number) {
    return this.http.get(this.task + '/' + id);
  }
}
