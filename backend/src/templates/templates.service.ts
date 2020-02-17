import { Injectable } from '@nestjs/common';
import {createConnection} from "typeorm";
import { TemplateType } from '../interfaces/template.interface';
import { task_templates } from '../entity/TaskTemplates';

@Injectable()
export class TemplatesService {
    async findAll(): Promise<TemplateType[]> {
      try {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(task_templates);
          let list: TemplateType[] = u.map(x => {
              let it = new TemplateType();
              it.id = x.id.toString();
              it.type_id = x.type_id.toString();
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
