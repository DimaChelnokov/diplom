export class Item {
    constructor(
      public id: number, 
      public topic_id: number,
      public txt: string,
      public is_correct: boolean,
      public correct: number
    ) {}
  }
  