import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { tasks } from '../entity/Tasks';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TASK_REPOSITORY')
        private readonly service: Repository<tasks>,
    ) {}  

}
