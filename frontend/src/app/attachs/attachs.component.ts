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
      let status = error.status;
      if (status == 401) {
        this.router.navigate(['auth']);
      } else {
        alert("Error: " + status);
      }
    })
  }

  private loadGroups() {
    this.serv.getAttaches(this.id).subscribe((data: Attach[]) => {
      this.groups = data;
    },
    (error: any) => {
      let status = error.status;
      if (status == 401) {
        this.router.navigate(['auth']);
      } else {
        alert("Error: " + status);
      }
    })
  }

  onChanged(at: Attach) {
    if (at.task_id) {
      this.serv.detach(at.id).subscribe((data: boolean) => {
        at.task_id = null;
        at.id = null;
      },
      (error: any) => {
        let status = error.status;
        if (status == 401) {
          this.router.navigate(['auth']);
        } else {
          alert("Error: " + status);
        }
      });
    } else {
      at.task_id = this.id;
      this.serv.attach(at).subscribe((data: Attach) => {
        at.id = data.id;
      },
      (error: any) => {
        let status = error.status;
        if (status == 401) {
          this.router.navigate(['auth']);
        } else {
          alert("Error: " + status);
        }
      });
    }
  }
}
