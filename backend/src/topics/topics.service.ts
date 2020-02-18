import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { TopicType } from '../interfaces/topic.interface';
import { task_topics } from '../entity/TaskTopics';

@Injectable()
export class TopicsService {

    async findAll(): Promise<TopicType[]> {
            const connection = await createConnection();
            try {
                const l = await connection.getRepository(task_topics)
                .createQueryBuilder("task_topics")
                .getMany();
                let list: TopicType[] = l.map(x => {
                    let it = new TopicType();
                    it.id = x.id.toString();
                    it.task_id = x.task_id.toString();
                    it.template_id = x.template_id.toString();
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

    async findTask(id: string): Promise<TopicType[]> {
            const connection = await createConnection();
            try {
                const l = await connection.getRepository(task_topics)
                .createQueryBuilder("task_topics")
                .where("task_topics.task_id = :id", {id: id})
                .addOrderBy("task_topics.id", "ASC")
                .getMany();
                let list: TopicType[] = l.map(x => {
                    let it = new TopicType();
                    it.id = x.id.toString();
                    it.task_id = x.task_id.toString();
                    it.template_id = x.template_id.toString();
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

    async create(x: TopicType): Promise<TopicType> {
            const connection = await createConnection();
            try {
                let y = await connection.getRepository(task_topics)
                .createQueryBuilder("task_topics")
                .insert()
                .into(task_topics)
                .values({
                    task_id: Number(x.task_id),
                    template_id: Number(x.template_id)
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

    async delete(x: TopicType): Promise<TopicType> {
            const connection = await createConnection();
            try {
                await connection.getRepository(task_topics)
                .createQueryBuilder("task_topics")
                .delete()
                .from(task_topics)
                .where("task_topics.id = :id", {id: x.id})
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
