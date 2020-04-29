export class Slide {
    constructor(
      public id: number, 
      public task: string, 
      public task_id: number,
      public img: string, 
      public txt: string, 
      public is_radio: boolean,
      public next: number, 
      public prev: number,
      public grade_id: number
    ) {}
  }
  