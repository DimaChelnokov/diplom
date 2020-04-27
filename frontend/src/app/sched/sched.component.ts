import { Component, OnInit } from '@angular/core';
import { SchedService } from './sched.service';
import { Router } from '@angular/router';
import { Sched } from './sched';
import { Grade } from './grade';

@Component({
  selector: 'app-sched',
  providers: [SchedService],
  templateUrl: './sched.component.html',
  styleUrls: ['./sched.component.css']
})
export class SchedComponent implements OnInit {

  tasks: Array<Sched>;
  grades: Array<Grade>;
 
  constructor(    
    private serv: SchedService,
    private router: Router
  ) { 
    this.grades = new Array<Grade>();
    this.tasks = new Array<Sched>();
  }

  ngOnInit(): void {
    this.loadGrades();
  }

  private loadGrades() {
    this.serv.getGrades().subscribe((data: Grade[]) => {
      this.grades = data;
      this.loadTasks();
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  private loadTasks() {
    this.serv.getTasks().subscribe((data: Sched[]) => {
      this.tasks = data;
    },
    (error: any) => {
      if (error.status == 401) {
        this.router.navigate(['auth']);
      }
    })
  }

  goTo(sched: Sched) { }
}
