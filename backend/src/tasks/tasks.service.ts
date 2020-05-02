import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { tasks } from '../entity/Tasks';
import { TaskType } from '../interfaces/task.interface';

@Injectable()
export class TasksService {

    constructor(
        @Inject('TASK_REPOSITORY')
        private readonly service: Repository<tasks>,
    ) {}  

    async findOne(user: number, id: number): Promise<TaskType> {
        try {
            const x = await this.service.createQueryBuilder("tasks")
            .where("tasks.id = :id and tasks.created_by = :user", {id: id, user: user})
            .getOne();
            if (!x) {
                return null;
            }
            let it = new TaskType();
            it.id = x.id;
            it.type_id = x.type_id;
            it.created = x.created;
            it.created_by = x.created_by;
            it.name = x.name;
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async getTasks(user: number): Promise<TaskType[]> {
        try {
            const x = await this.service.query(
               `select a.id as id, a.type_id as type_id, a.created as created, 
                       a.created_by as created_by, a.name as name, b.name as gradetype,
                       string_agg(d.name, ',') as groups
                from   tasks a
                inner  join grade_types b on (b.id = a.gradetype_id)
                left   join group_tasks c on (c.task_id = a.id)
                left   join groups d on (d.id = c.group_id)
                where  a.created_by = $1
                and    now() > a.created and now() <= coalesce(a.deleted, now())
                group  by a.id, a.type_id, a.created, a.created_by, a.name, b.name
                order  by a.created desc`, [user]);
                let list: TaskType[] = x.map(x => {
                    let it = new TaskType();
                    it.id = x.id;
                    it.type_id = x.type_id;
                    it.created = x.created;
                    it.created_by = x.created_by;
                    it.name = x.name;
                    it.gradetype = x.gradetype;
                    it.groups = x.groups;
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

    async delete(user: number, id: number): Promise<TaskType> {
        try {
            await this.service.createQueryBuilder("tasks")
            .update(tasks)
            .set({ deleted: new Date()})
            .where("tasks.id = :id and tasks.created_by = :user", {id: id, user: user})
            .execute();
            return await this.findOne(user, id);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
