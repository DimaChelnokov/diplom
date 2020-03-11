import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { grade_rules } from '../entity/GradeRules';
import { GradeRules } from '../interfaces/rules.interface';

@Injectable()
export class RulesService {

    constructor(
        @Inject('RULE_REPOSITORY')
        private readonly service: Repository<grade_rules>,
      ) {}  

      async findAll(): Promise<GradeRules[]> {
        try {
          const u = await this.service.find();
          let r: GradeRules[] = u.map(x => {
            let it = new GradeRules();
            it.id = x.id;
            it.task_id = x.task_id;
            it.type_id = x.type_id;
            it.grade_id = x.grade_id;
            it.total_num = x.total_num;
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

      async findOne(id: number): Promise<GradeRules> {
        try {
            const x = await this.service.createQueryBuilder("grade_rules")
            .where("grade_rules.id = :id", {id: id})
            .getOne();
            if (!x) {
              return null;
            }
            let it = new GradeRules();
            it.id = x.id;
            it.task_id = x.task_id;
            it.type_id = x.type_id;
            it.grade_id = x.grade_id;
            it.total_num = x.total_num;
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
     }
           
     async create(x: GradeRules): Promise<GradeRules> {
        try {
          const y = await this.service.createQueryBuilder("grade_rules")
          .insert()
          .into(grade_rules)
          .values({
              task_id: x.task_id,
              type_id: x.type_id,
              grade_id: x.grade_id,
              total_num: x.total_num
          })
          .returning('*')
          .execute();
          x.id = y.generatedMaps[0].id;
          return x;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async delete(id: number): Promise<GradeRules> {
        try {
          const r = this.findOne(id);
          if (r) {
            await this.service.createQueryBuilder("grade_rules")
            .delete()
            .from(grade_rules)
            .where("grade_rules.id = :id", {id: id})
            .execute();
          }
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
