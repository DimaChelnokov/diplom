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

    async findByStudent(student: number): Promise<ScheduleType[]> {
        try {
            const x = await this.service.query(
               `select a.id as id, a.created as created, a.task_id as task_id, b.name as task, c.name as group_name, 
                       g.name as grade, d.fio as created_by 
                from   group_tasks a
                inner  join tasks b on (b.id = a.task_id) 
                inner  join groups c on (c.id = a.group_id) 
                inner  join users d on (d.id = a.created_by) 
                inner  join students e on (e.group_id = c.id and now() > e.created and now() <= coalesce(e.deleted, now())) 
                left   join task_grade f on (f.task_id = b.id and f.student_id = e.id) 
                left   join grades g on (g.id = f.grade_id)
                where  e.user_id = $1 
                order by a.created desc`, [student]);
                let list: ScheduleType[] = x.map(x => {
                    let it = new ScheduleType();
                    it.id = x.id;
                    it.created = x.created;
                    it.task_id = x.task_id;
                    it.task = x.task;
                    it.group_name = x.group_name;
                    it.created_by = x.created_by;
                    it.grade = x.grade;
                    it.created_by = x.created_by;
                    return it;
                });
                return list;
            } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
