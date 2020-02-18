import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { Type } from '../interfaces/type.interface';
import { task_types } from '../entity/TaskTypes';

@Injectable()
export class TypesService {
    async findAll(): Promise<Type[]> {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(task_types);
          let list: Type[] = u.map(x => {
              let it = new Type();
              it.id = x.id.toString();
              it.name = x.name;
              return it;
          });
          connection.close();
          return list;
        } catch(error) {
          connection.close();
          console.error(error);
          throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
          });
        }
    }
}
