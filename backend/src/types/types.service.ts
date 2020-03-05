import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { Type } from '../interfaces/type.interface';
import { task_types } from '../entity/TaskTypes';

@Injectable()
export class TypesService {

    constructor(
      @Inject('TYPE_REPOSITORY')
      private readonly service: Repository<task_types>,
    ) {}  

    async findAll(): Promise<Type[]> {
      try {
        const u = await this.service.find();
        let r: Type[] = u.map(x => {
          let it = new Type();
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
