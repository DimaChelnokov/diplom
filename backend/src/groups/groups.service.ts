import { Injectable, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import {createConnection} from "typeorm";
import { GroupType } from '../interfaces/group.interface';
import { groups } from '../entity/Groups';

@Injectable()
export class GroupsService {

    async findAll(): Promise<GroupType[]> {
        const connection = await createConnection();
        try {
            const l = await connection.getRepository(groups)
            .createQueryBuilder("groups")
            .where("date_to is null or date_to > now()")
            .getMany();
            let list: GroupType[] = l.map(x => {
                let it = new GroupType();
                it.id = x.id.toString();
                it.name = x.name;
                it.created = x.date_from.toString();
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

    async findOne(id: string): Promise<GroupType> {
        const connection = await createConnection();
        try {
            const x = await connection.getRepository(groups)
            .createQueryBuilder("groups")
            .where("groups.id = :id", {id: id})
            .getOne();
            let it = new GroupType();
            it.id = x.id.toString();
            it.name = x.name;
            it.created = x.date_from.toString();
            it.deleted = x.date_to.toString();
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

    async update(x: GroupType): Promise<GroupType> {
        let r = x;
        const connection = await createConnection();
        try {
            if (x.id) {
                r = await this.findOne(x.id);
                await connection.getRepository(groups)
                .createQueryBuilder("groups")
                .update(groups)
                .set({ 
                    name: x.name, 
                    date_to: x.deleted
                })
                .where("groups.id = :id", {id: x.id})
                .execute();
                r.name = x.name;
                r.deleted = x.deleted;
            } else {
                let y = await connection.getRepository(groups)
                .createQueryBuilder("groups")
                .insert()
                .into(groups)
                .values({
                    name: x.name, 
                    date_from: new Date()
                })
                .returning('*')
                .execute();
                r.id = y.generatedMaps[0].id.toString();
            }
        } catch (error) {
            connection.close();
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
        connection.close();
        return r;
    }

    async delete(id: string): Promise<GroupType> {
        const connection = await createConnection();
        try {
            await connection.getRepository(groups)
            .createQueryBuilder("groups")
            .update(groups)
            .set({ date_to: new Date()})
            .where("groups.id = :id", {id: id})
            .execute();
            connection.close();
            return await this.findOne(id);
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
