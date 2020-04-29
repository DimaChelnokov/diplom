export class Result {
    constructor(
        public student_id: number, 
        public task_id: number,
        public item_id: number,
        public is_checked: boolean,
        public checked: Date
    ) {}
  }
  