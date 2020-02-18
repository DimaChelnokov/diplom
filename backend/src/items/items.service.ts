import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { task_items } from '../entity/TaskItems';
import { ItemType } from '../interfaces/item.interface';

@Injectable()
export class ItemsService {

    async findAll(): Promise<ItemType[]> {
        const connection = await createConnection();
        try {
            const l = await connection.getRepository(task_items)
            .createQueryBuilder("task_items")
            .getMany();
            let list: ItemType[] = l.map(x => {
                let it = new ItemType();
                it.id = x.id.toString();
                it.topic_id = x.topic_id.toString();
                it.item_id = x.item_id.toString();
                it.text = x.txt;
                it.is_correct = x.is_correct ? 'true' : 'false';
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

    async findTopics(id: string): Promise<ItemType[]> {
        const connection = await createConnection();
        try {
            const l = await connection.getRepository(task_items)
            .createQueryBuilder("task_items")
            .where("task_items.topic_id = :id", {id: id})
            .addOrderBy("task_topics.id", "ASC")
            .getMany();
            let list: ItemType[] = l.map(x => {
                let it = new ItemType();
                it.id = x.id.toString();
                it.topic_id = x.topic_id.toString();
                it.item_id = x.item_id.toString();
                it.text = x.txt;
                it.is_correct = x.is_correct ? 'true' : 'false';
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

    async create(x: ItemType): Promise<ItemType> {
        const connection = await createConnection();
        try {
            let y = await connection.getRepository(task_items)
            .createQueryBuilder("task_items")
            .insert()
            .into(task_items)
            .values({
                topic_id: Number(x.topic_id),
                item_id: Number(x.item_id),
                txt: x.text,
                is_correct: x.is_correct == 'true'
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

    async delete(x: ItemType): Promise<ItemType> {
        const connection = await createConnection();
        try {
            await connection.getRepository(task_items)
            .createQueryBuilder("task_items")
            .delete()
            .from(task_items)
            .where("task_items.id = :id", {id: x.id})
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
