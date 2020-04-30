import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { grades } from '../entity/Grades';
import { GradeType } from '../interfaces/gradetype.interface';

@Injectable()
export class GradetypesService {

  constructor(
    @Inject('GRADETYPE_REPOSITORY')
    private readonly service: Repository<grades>,
  ) {}  

  async findTypes(): Promise<GradeType[]> {
    try {
      const x = await this.service.query(
        `select id, name
         from   grade_types`);
      let r: GradeType[] = x.map(x => {
        let it = new GradeType();
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

  async findGrades(id: number): Promise<GradeType[]> {
    try {
      const x = await this.service.query(
        `select id, name
         from   grades
         where  type_id = $1`, [id]);
      let r: GradeType[] = x.map(x => {
        let it = new GradeType();
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
