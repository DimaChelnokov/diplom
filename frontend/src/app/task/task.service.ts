import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {

  private upload = '/api/upload';

  constructor(private http: HttpClient) { }

  uploadFile(formData: FormData) {
    return this.http.post('/api/upload', formData);
  }
}
