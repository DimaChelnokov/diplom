import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import {createConnection, Repository} from "typeorm";
import { task_items } from '../entity/TaskItems';
import { ItemType } from '../interfaces/item.interface';

@Injectable()
export class ItemsService {

    constructor(
        @Inject('ITEM_REPOSITORY')
        private readonly service: Repository<task_items>,
    ) {}  

    async findAll(): Promise<ItemType[]> {
        try {
            const l = await this.service.createQueryBuilder("task_items")
            .getMany();
            let r: ItemType[] = l.map(x => {
                let it = new ItemType();
                it.id = x.id;
                it.topic_id = x.topic_id;
                it.item_id = x.item_id;
                it.text = x.txt;
                it.is_correct = x.is_correct;
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

    async findTopics(id: number): Promise<ItemType[]> {
        try {
            const l = await this.service.createQueryBuilder("task_items")
            .where("task_items.topic_id = :id", {id: id})
            .addOrderBy("task_topics.id", "ASC")
            .getMany();
            let r: ItemType[] = l.map(x => {
                let it = new ItemType();
                it.id = x.id;
                it.topic_id = x.topic_id;
                it.item_id = x.item_id;
                it.text = x.txt;
                it.is_correct = x.is_correct;
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

    async create(x: ItemType): Promise<ItemType> {
        try {
            const y = await this.service.createQueryBuilder("task_items")
            .insert()
            .into(task_items)
            .values({
                topic_id: x.topic_id,
                item_id: x.item_id,
                txt: x.text,
                is_correct: x.is_correct
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

    async delete(x: ItemType): Promise<ItemType> {
        try {
            await this.service.createQueryBuilder("task_items")
            .delete()
            .from(task_items)
            .where("task_items.id = :id", {id: x.id})
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
