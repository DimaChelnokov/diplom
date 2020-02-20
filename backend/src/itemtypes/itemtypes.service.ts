import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import {createConnection, Repository} from "typeorm";
import { item_types } from '../entity/ItemTypes';
import { ItemtypeType } from '../interfaces/itemtype.interface';

@Injectable()
export class ItemtypesService {

  constructor(
    @Inject('ITEMTYPE_REPOSITORY')
    private readonly service: Repository<item_types>,
  ) {}  

  async findAll(): Promise<ItemtypeType[]> {
    try {
      const u = await this.service.find();
      let r: ItemtypeType[] = u.map(x => {
        let it = new ItemtypeType();
        it.id = x.id;
        it.name = x.name;
        return it;
      });
      return r;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
        status: HttpStatus.BAD_REQUEST,
        error: error
      });
    }
  }
}
