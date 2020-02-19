import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { TaskType } from '../interfaces/task.interface';
import { tasks } from '../entity/Tasks';

@Injectable()
export class TasksService {

    async findAll(): Promise<TaskType[]> {
            const connection = await createConnection();
            try {
                const l = await connection.getRepository(tasks)
                .createQueryBuilder("tasks")
                .getMany();
                let list: TaskType[] = l.map(x => {
                    let it = new TaskType();
                    it.id = x.id;
                    it.type_id = x.type_id;
                    it.name = x.name;
                    it.created_by = x.created_by;
                    it.gradetype_id = x.gradetype_id;
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

    async findOne(id: string): Promise<TaskType> {
            const connection = await createConnection();
            try {
                const x = await connection.getRepository(tasks)
                .createQueryBuilder("tasks")
                .where("tasks.id = :id", {id: id})
                .getOne();
                let it = new TaskType();
                it.id = x.id;
                it.type_id = x.type_id;
                it.name = x.name;
                it.created_by = x.created_by;
                it.gradetype_id = x.gradetype_id;
                it.created = x.created;
                connection.close();
                return it;
            } catch(error) {
                connection.close();
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
            }
    }

    async create(x: TaskType): Promise<TaskType> {
            const connection = await createConnection();
            try {
                let y = await connection.getRepository(tasks)
                .createQueryBuilder("tasks")
                .insert()
                .into(tasks)
                .values({
                    type_id: x.type_id,
                    name: x.name,
                    created_by: x.created_by,
                    gradetype_id: x.gradetype_id,
                    created: new Date()
                })
                .returning('*')
                .execute();
                x.id = y.generatedMaps[0].id.toString();
                connection.close();
                return x;
            } catch (error) {
                connection.close();
                console.error(error);
                throw new InternalServerErrorException({
                    status: HttpStatus.BAD_REQUEST,
                    error: error
                });
            }
    }

    async delete(x: TaskType): Promise<TaskType> {
            const connection = await createConnection();
            try {
                await connection.getRepository(tasks)
                .createQueryBuilder("tasks")
                .delete()
                .from(tasks)
                .where("tasks.id = :id", {id: x.id})
                .execute();
                connection.close();
                return x;
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
