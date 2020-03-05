import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { ScheduleType } from '../interfaces/schedule.interface';
import { group_tasks } from '../entity/GroupTasks';

@Injectable()
export class SchedulesService {

    constructor(
        @Inject('SCHED_REPOSITORY')
        private readonly service: Repository<group_tasks>,
    ) {}  

    async findAll(): Promise<ScheduleType[]> {
        try {
            const l = await this.service.createQueryBuilder("group_tasks")
            .getMany();
            let r: ScheduleType[] = l.map(x => {
                let it = new ScheduleType();
                it.id = x.id;
                it.task_id = x.task_id;
                it.group_id = x.group_id;
                it.created = x.created;
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

    async create(x: ScheduleType): Promise<ScheduleType> {
        try {
            const y = await this.service.createQueryBuilder("group_tasks")
            .insert()
            .into(group_tasks)
            .values({
                task_id: x.task_id,
                group_id: x.group_id,
                created: new Date()
            })
            .returning('*')
            .execute();
            x.id = y.generatedMaps[0].id.toString();
            return x;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async delete(x: ScheduleType): Promise<ScheduleType> {
        try {
            await this.service.createQueryBuilder("group_tasks")
            .delete()
            .from(group_tasks)
            .where("tasks.id = :id", {id: x.id})
            .execute();
            return x;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
