import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { TopicType } from '../interfaces/topic.interface';
import { task_topics } from '../entity/TaskTopics';

@Injectable()
export class TopicsService {

    constructor(
        @Inject('TOPIC_REPOSITORY')
        private readonly service: Repository<task_topics>,
    ) {}  

    async findAll(): Promise<TopicType[]> {
        try {
            const l = await this.service.createQueryBuilder("task_topics")
            .getMany();
            let r: TopicType[] = l.map(x => {
                let it = new TopicType();
                it.id = x.id;
                it.task_id = x.task_id;
                it.template_id = x.template_id;
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

    async findOne(id: number): Promise<TopicType> {
        try {
            const x = await this.service.createQueryBuilder("task_topics")
            .where("task_topics.id = :id", {id: id})
            .getOne();
            if (!x) {
              return null;
            }
            let it = new TopicType();
            it.id = x.id;
            it.task_id = x.task_id;
            it.template_id = x.template_id;
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async findTask(id: string): Promise<TopicType[]> {
        try {
            const l = await this.service.createQueryBuilder("task_topics")
            .where("task_topics.task_id = :id", {id: id})
            .addOrderBy("task_topics.id", "ASC")
            .getMany();
            let r: TopicType[] = l.map(x => {
                let it = new TopicType();
                it.id = x.id;
                it.task_id = x.task_id;
                it.template_id = x.template_id;
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

    async create(x: TopicType): Promise<TopicType> {
        try {
            const y = await this.service.createQueryBuilder("task_topics")
            .insert()
            .into(task_topics)
            .values({
                task_id: x.task_id,
                template_id: x.template_id
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

    async delete(id: number): Promise<TopicType> {
        try {
            const r = this.findOne(id);
            if (r) {
                await this.service.createQueryBuilder("task_topics")
                .delete()
                .from(task_topics)
                .where("task_topics.id = :id", {id: id})
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
