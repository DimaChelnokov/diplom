import { Component, OnInit } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Array<Task>;

  constructor(
    private serv: TasksService,
    private router: Router
  ) { 
    this.tasks = new Array<Task>();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks() {
    this.serv.getTasks().subscribe((data: Task[]) => {
      this.tasks = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  deleteTask(task: Task) {
    if (confirm("Удалить задание?")) {
      this.serv.deleteTask(task.id).subscribe(data => {
          setTimeout(() => this.loadTasks(), 2000);
      });
    }
  }
}
