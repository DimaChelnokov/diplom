import { Injectable } from '@nestjs/common';
import {createConnection} from "typeorm";
import { ItemType } from '../interfaces/itemtype.interface';
import { item_types } from '../entity/ItemTypes';

@Injectable()
export class ItemtypesService {

    async findAll(): Promise<ItemType[]> {
      try {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(item_types);
          let list: ItemType[] = u.map(x => {
              let it = new ItemType();
              it.id = x.id.toString();
              it.name = x.name;
              return it;
          });
          connection.close();
          return list;
        } catch (error) {
          connection.close();
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      }
}
}
