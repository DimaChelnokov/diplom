export class User {
  constructor(
    public id: number, 
    public username: string, 
    public email: string,
    public roleId: number,
    public group_id: number
  ) {}
}
