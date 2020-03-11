import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { TaskType } from '../interfaces/task.interface';
import { tasks } from '../entity/Tasks';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TASK_REPOSITORY')
        private readonly service: Repository<tasks>,
    ) {}  

    async findAll(): Promise<TaskType[]> {
        try {
            const l = await this.service.createQueryBuilder("tasks")
            .getMany();
            let r: TaskType[] = l.map(x => {
                let it = new TaskType();
                it.id = x.id;
                it.type_id = x.type_id;
                it.name = x.name;
                it.created_by = x.created_by;
                it.gradetype_id = x.gradetype_id;
                it.created = x.created;
                return it;
            });
            return r;
        } catch(error) {
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
        }
    }

    async findOne(id: number): Promise<TaskType> {
        try {
            const x = await this.service.createQueryBuilder("tasks")
            .where("tasks.id = :id", {id: id})
            .getOne();
            if (!x) {
                return null;
            }
            let it = new TaskType();
            it.id = x.id;
            it.type_id = x.type_id;
            it.name = x.name;
            it.created_by = x.created_by;
            it.gradetype_id = x.gradetype_id;
            it.created = x.created;
            return it;
        } catch (error) {
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
        }
    }

    async create(x: TaskType, user: any): Promise<TaskType> {
        try {
            const y = await this.service.createQueryBuilder("tasks")
            .insert()
            .into(tasks)
            .values({
                type_id: x.type_id,
                name: x.name,
                created_by: user.userId,
                gradetype_id: x.gradetype_id,
                created: new Date()
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

    async delete(id: number): Promise<TaskType> {
        try {
            const r = this.findOne(id);
            if (r) {
                await this.service.createQueryBuilder("tasks")
                .delete()
                .from(tasks)
                .where("tasks.id = :id", {id: id})
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
