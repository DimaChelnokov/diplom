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

  async findAll(): Promise<GradeType[]> {
    try {
      const u = await this.service.find();
      let r: GradeType[] = u.map(x => {
        let it = new GradeType();
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
