import { Component, OnInit } from '@angular/core';
import { Attach } from './attach';
import { ActivatedRoute, Router } from '@angular/router';
import { AttachsService } from './attachs.service';
import { Task } from './task';

@Component({
  selector: 'app-attachs',
  providers: [AttachsService],
  templateUrl: './attachs.component.html',
  styleUrls: ['./attachs.component.css']
})
export class AttachsComponent implements OnInit {

  id: number;
  groups: Array<Attach>;
  task: Task;

  constructor(
    private route: ActivatedRoute,
    private serv: AttachsService,
    private router: Router
  ) { 
    this.id = route.snapshot.params.id;
    this.groups = new Array<Attach>();
    this.task = null;
  }

  ngOnInit(): void {
    this.loadTask();
  }

  private loadTask() {
    this.serv.getTask(this.id).subscribe((data: Task) => {
      this.task = data;
      this.loadGroups();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadGroups() {
    this.serv.getAttaches(this.id).subscribe((data: Attach[]) => {
      this.groups = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  onChanged(at: Attach) {
    if (at.task_id) {
      this.serv.detach(at.id).subscribe((data: boolean) => {
        at.task_id = null;
        at.id = null;
      });
    } else {
      at.task_id = this.id;
      this.serv.attach(at).subscribe((data: Attach) => {
        at.id = data.id;
      });
    }
  }
}
