export class Answer {
    constructor(
        public id: number, 
        public slide_id: number, 
        public txt: string,
        public is_correct: boolean,
        public is_checked: boolean
    ) {}
  }
  