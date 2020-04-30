export class Solved {
    constructor(
      public id: number, 
      public task: string, 
      public task_id: number, 
      public group_name: string,
      public solved_by: string, 
      public solved: Date,
      public note: string,
      public start: number,
      public student_id: number
    ) {}
  }
  