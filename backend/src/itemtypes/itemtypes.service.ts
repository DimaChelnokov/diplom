import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { item_types } from '../entity/ItemTypes';
import { ItemtypeType } from '../interfaces/itemtype.interface';

@Injectable()
export class ItemtypesService {
    async findAll(): Promise<ItemtypeType[]> {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(item_types);
          let list: ItemtypeType[] = u.map(x => {
              let it = new ItemtypeType();
              it.id = x.id.toString();
              it.name = x.name;
              return it;
          });
          connection.close();
          return list;
        } catch (error) {
          connection.close();
          console.error(error);
          throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }
}
