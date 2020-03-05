import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { TemplateType } from '../interfaces/template.interface';
import { task_templates } from '../entity/TaskTemplates';

@Injectable()
export class TemplatesService {

    constructor(
      @Inject('TEMPLATE_REPOSITORY')
      private readonly service: Repository<task_templates>,
    ) {}  

    async findAll(): Promise<TemplateType[]> {
      try {
        const u = await this.service.find();
        let r: TemplateType[] = u.map(x => {
          let it = new TemplateType();
          it.id = x.id;
          it.type_id = x.type_id;
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
