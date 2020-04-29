import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { task_grade } from '../entity/TaskGrade';

@Injectable()
export class GradesService {

  constructor(
    @Inject('GRADE_REPOSITORY')
    private readonly service: Repository<task_grade>,
  ) {}  

}
