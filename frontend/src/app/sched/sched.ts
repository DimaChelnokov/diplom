export class Sched {
    constructor(
      public id: number, 
      public task: string, 
      public task_id: number, 
      public group_name: string,
      public created_by: string, 
      public created: Date,
      public grade: string
    ) {}
  }
  