import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from './task';
import { Router } from '@angular/router';
import { GradeType } from './gradetype';

@Component({
  selector: 'app-tasks',
  providers: [TasksService],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild('readOnlyTemplate', { static: false }) readOnlyTemplate: TemplateRef<any>;
  @ViewChild('editTemplate', { static: false }) editTemplate: TemplateRef<any>;

  editedTask: Task;
  tasks: Array<Task>;
  isNewRecord: boolean;
  gradeTypes: Array<GradeType>;

  constructor(
    private serv: TasksService,
    private router: Router
  ) { 
    this.gradeTypes = new Array<GradeType>();
    this.tasks = new Array<Task>();
    this.editedTask = null;
    this.isNewRecord = false;
  }

  ngOnInit(): void {
    this.loadGradeTypes();
  }

  private loadGradeTypes() {
    this.serv.getGradeTypes().subscribe((data: GradeType[]) => {
      this.gradeTypes = data;
      this.loadTasks();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
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

  editTask(task: Task) {
    this.editedTask = new Task(
      task.id, 
      task.type_id,
      task.created,
      task.created_by,
      task.name,
      task.gradetype,
      task.gradetype_id,
      task.groups);
  }

  loadTemplate(task: Task) {
    if (this.editedTask && this.editedTask.id == task.id) {
      return this.editTemplate;
    } else {
      return this.readOnlyTemplate;
    }
  }

  addTask() {
    this.editedTask = new Task(null, 1, new Date, null, '', '', 1, '');
    this.tasks.push(this.editedTask);
    this.isNewRecord = true;
  }

  cancel() {
    if (this.isNewRecord) {
      this.tasks.pop();
      this.isNewRecord = false
    }
    this.editedTask = null;
  }

  saveTask() {
    if (this.isNewRecord) {
      this.editedTask.gradetype = this.gradeTypes.filter((grade) => {
        return grade.id == this.editedTask.gradetype_id;
      })[0]?.name;
      this.serv.createTask(this.editedTask).subscribe(data => {
        setTimeout(() => this.loadTasks(), 2000);
      });
      this.isNewRecord = false
      this.editedTask = null;
    } else {
      this.serv
        .updateGroup(this.editedTask.id, this.editedTask)
        .subscribe(data => {
          this.loadTasks();
        });
      this.editedTask = null;
    }
  }

  deleteTask(task: Task) {
    if (confirm("Удалить задание?")) {
      this.serv.deleteTask(task.id).subscribe(data => {
          setTimeout(() => this.loadTasks(), 2000);
      });
    }
  }

  goTo(task: Task) {
    this.router.navigate(['topics/' + task.id]);
  }
}
