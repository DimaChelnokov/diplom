import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { tasks } from '../entity/Tasks';
import { TaskType } from '../interfaces/task.interface';
import { TopicType } from '../interfaces/topic.interface';
import { task_topics } from '../entity/TaskTopics';
import { task_items } from '../entity/TaskItems';

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

    async getTopics(task: number): Promise<TopicType[]> {
        try {
            const x = await this.service.query(
                `select a.id as id, b.txt as name, a.is_radio as is_radio, a.task_id as task_id
                 from   task_topics a
                 inner  join task_items b on (b.topic_id = a.id and b.item_id = 2)
                 where  a.task_id = $1
                 order  by a.id`, [task]);
                 let list: TopicType[] = x.map(x => {
                     let it = new TopicType();
                     it.id = x.id;
                     it.task_id = x.task_id;
                     it.name = x.name;
                     it.is_radio = x.is_radio;
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

    async addTopic(topic: TopicType): Promise<TopicType> {
        try {
            const y = await this.service.createQueryBuilder("task_topics")
            .insert()
            .into(task_topics)
            .values({
                task_id: topic.task_id,
                template_id: 1,
                is_radio: topic.is_radio
            })
            .returning('*')
            .execute();
            topic.id = y.generatedMaps[0].id;
            await this.service.createQueryBuilder("task_items")
            .insert()
            .into(task_items)
            .values({
                topic_id: topic.id,
                item_id: 2,
                is_correct: false
            })
            .execute();
            return topic;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async deleteTopic(id: number): Promise<boolean> {
        try {
            await this.service.createQueryBuilder("task_topics")
            .delete()
            .from(task_topics)
            .where("task_topics.id = :id", {id: id})
            .execute();
            return true;
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
                       a.created_by as created_by, a.name as name, b.name as gradetype, b.id as gradetype_id,
                       string_agg(d.name, ',') as groups
                from   tasks a
                inner  join grade_types b on (b.id = a.gradetype_id)
                left   join group_tasks c on (c.task_id = a.id)
                left   join groups d on (d.id = c.group_id)
                where  a.created_by = $1
                and    now() > a.created and now() <= coalesce(a.deleted, now())
                group  by a.id, a.type_id, a.created, a.created_by, a.name, b.name, b.id
                order  by a.created desc`, [user]);
                let list: TaskType[] = x.map(x => {
                    let it = new TaskType();
                    it.id = x.id;
                    it.type_id = x.type_id;
                    it.created = x.created;
                    it.created_by = x.created_by;
                    it.name = x.name;
                    it.gradetype = x.gradetype;
                    it.gradetype_id = x.gradetype_id;
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

    async addTask(user: number, task: TaskType): Promise<TaskType> {
        try {
            const y = await this.service.createQueryBuilder("tasks")
            .insert()
            .into(tasks)
            .values({
                created_by: user,
                gradetype_id: task.gradetype_id,
                type_id: 1,
                name: task.name,
                created: new Date()
            })
            .returning('*')
            .execute();
            task.id = y.generatedMaps[0].id;
            return task;
        } catch (error) {
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
        }
    }

    async updateTask(user: number, id: number, task: TaskType): Promise<TaskType> {
        try {
            await this.service.createQueryBuilder("tasks")
            .update(tasks)
            .set({ 
                name: task.name,
                gradetype_id: task.gradetype_id
            })
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
