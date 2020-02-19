import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { ScheduleType } from '../interfaces/schedule.interface';
import { group_tasks } from '../entity/GroupTasks';

@Injectable()
export class SchedulesService {
    async findAll(): Promise<ScheduleType[]> {
            const connection = await createConnection();
            try {
                const l = await connection.getRepository(group_tasks)
                .createQueryBuilder("group_tasks")
                .getMany();
                let list: ScheduleType[] = l.map(x => {
                    let it = new ScheduleType();
                    it.id = x.id;
                    it.task_id = x.task_id;
                    it.group_id = x.group_id;
                    it.created = x.created;
                    return it;
                });
                connection.close();
                return list;
            } catch(error) {
                connection.close();
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
            }
    }
}
