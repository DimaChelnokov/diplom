import { Component, OnInit } from '@angular/core';
import { SolvedService } from './solved.service';
import { Solved } from './solved';
import { Router } from '@angular/router';

@Component({
  selector: 'app-solved',
  providers: [SolvedService],
  templateUrl: './solved.component.html',
  styleUrls: ['./solved.component.css']
})
export class SolvedComponent implements OnInit {

  tasks: Array<Solved>;

  constructor(
    private serv: SolvedService,
    private router: Router
  ) { 
    this.tasks = Array<Solved>();
  }

  ngOnInit(): void {
    this.loadTasks();
  }

  private loadTasks() {
    this.serv.getTasks().subscribe((data: Solved[]) => {
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

  goTo(it: Solved) { 
    this.router.navigate(['res/' + it.student_id + '/' + it.start]);
  }
}
