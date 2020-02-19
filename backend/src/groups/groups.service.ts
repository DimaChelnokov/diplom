import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import {createConnection, Repository} from "typeorm";
import { GroupType } from '../interfaces/group.interface';
import { groups } from '../entity/Groups';

@Injectable()
export class GroupsService {

    constructor(
        @Inject('GROUP_REPOSITORY')
        private readonly service: Repository<groups>,
    ) {}  

    async findAll(): Promise<GroupType[]> {
        try {
            const x = await this.service.createQueryBuilder("groups")
            .where("date_to is null or date_to > now()")
            .getMany();
            let list: GroupType[] = x.map(x => {
                let it = new GroupType();
                it.id = x.id;
                it.name = x.name;
                it.created = x.date_from;
                return it;
            });
            return list;
        } catch(error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async findOne(id: number): Promise<GroupType> {
        try {
            const x = await this.service.createQueryBuilder("groups")
            .where("groups.id = :id", {id: id})
            .getOne();
            let it = new GroupType();
            it.id = x.id;
            it.name = x.name;
            it.created = x.date_from;
            it.deleted = x.date_to;
            return it;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async update(x: GroupType): Promise<GroupType> {
        try {
            if (x.id) {
                const r = await this.service.findOne(x.id);
                await this.service.createQueryBuilder("groups")
                .update(groups)
                .set({ 
                    name: x.name, 
                    date_to: x.deleted
                })
                .where("groups.id = :id", {id: x.id})
                .execute();
                x.name = r.name;
                x.deleted = r.date_to;
            } else {
                let y = await this.service.createQueryBuilder("groups")
                .insert()
                .into(groups)
                .values({
                    name: x.name, 
                    date_from: new Date()
                })
                .returning('*')
                .execute();
                x.id = y.generatedMaps[0].id.toString();
            }
            return x;
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }

    async delete(id: number): Promise<GroupType> {
        try {
            await this.service.createQueryBuilder("groups")
            .update(groups)
            .set({ date_to: new Date()})
            .where("groups.id = :id", {id: id})
            .execute();
            return await this.findOne(id);
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException({
                status: HttpStatus.BAD_REQUEST,
                error: error
            });
        }
    }
}
