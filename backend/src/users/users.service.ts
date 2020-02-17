import { Injectable } from '@nestjs/common';
import { User } from '../interfaces/user.interface';
import {createConnection} from "typeorm";
import { users } from '../entity/Users';

@Injectable()
export class UsersService {

    private readonly users: User[] = [];

    create(user: User) {
        this.users.push(user);
    }

    async findAll(): Promise<User[]> {
      try {
        const connection = await createConnection();
        const u = await connection.manager.find(users);
        let list: User[] = u.map(x => {
            let item = new User();
            item.userId = x.id.toString();
            item.roleId = x.role_id.toString();
            item.name = x.fio;
            item.login = x.login;
            item.password = x.pass;
            return item;
        });
        connection.close();
        return list;
      } catch (error) {
        console.error(error);
      }
    }

    findOne(id: string): User {
        return this.users[id];
    }
}
