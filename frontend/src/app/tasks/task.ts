export class Task {
    constructor(
      public id: number, 
      public type_id: number,
      public created: Date,
      public created_by: number,
      public name: string,
      public gradetype: string,
      public groups: string
    ) {}
  }
  