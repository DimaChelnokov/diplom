import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { TemplateType } from '../interfaces/template.interface';
import { task_templates } from '../entity/TaskTemplates';

@Injectable()
export class TemplatesService {
    async findAll(): Promise<TemplateType[]> {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(task_templates);
          let list: TemplateType[] = u.map(x => {
              let it = new TemplateType();
              it.id = x.id;
              it.type_id = x.type_id;
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
