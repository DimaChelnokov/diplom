import { Component, OnInit } from '@angular/core';
import { SchedService } from './sched.service';
import { Router } from '@angular/router';
import { Sched } from './sched';

@Component({
  selector: 'app-sched',
  providers: [SchedService],
  templateUrl: './sched.component.html',
  styleUrls: ['./sched.component.css']
})
export class SchedComponent implements OnInit {

  tasks: Array<Sched>;
 
  constructor(    
    private serv: SchedService,
    private router: Router
  ) { 
    this.tasks = new Array<Sched>();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks() {
    this.serv.getTasks().subscribe((data: Sched[]) => {
      this.tasks = data;
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

  goTo(sched: Sched) { 
    this.router.navigate(['slide/' + sched.start]);
  }
}
