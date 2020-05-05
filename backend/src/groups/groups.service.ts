import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { GroupType } from '../interfaces/group.interface';
import { groups } from '../entity/Groups';
import { AttachType } from '../interfaces/attach.interface';
import { group_tasks } from '../entity/GroupTasks';

@Injectable()
export class GroupsService {

    constructor(
        @Inject('GROUP_REPOSITORY')
        private readonly service: Repository<groups>,
    ) {}  

    async getAttached(task: number): Promise<AttachType[]> {
        try {
            const x = await this.service.query(
                `select a.id as group_id, a.name as name, a.date_from as date_from,
                        b.task_id as task_id, b.id as id
                 from   groups a
                 left   join group_tasks b on (b.group_id = a.id and b.task_id = $1)
                 where  now() > a.date_from and now() <= coalesce(a.date_to, now())
                 order  by a.name`, [task]);
                 let list: AttachType[] = x.map(x => {
                     let it = new AttachType();
                     it.id = x.id;
                     it.group_id = x.group_id;
                     it.name = x.name;
                     it.date_from = x.date_from;
                     it.task_id = x.task_id;
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

    async addAttach(user: number, x: AttachType): Promise<AttachType> {
        try {
            const y = await this.service.createQueryBuilder("group_tasks")
            .insert()
            .into(group_tasks)
            .values({
                task_id: x.task_id,
                group_id: x.group_id,
                created_by: user,
                created: new Date()
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

    async delAttach(id: number): Promise<boolean> {
        try {
            await this.service.createQueryBuilder("group_tasks")
            .delete()
            .from(group_tasks)
            .where("group_tasks.id = :id", {id: id})
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

    async findAll(): Promise<GroupType[]> {
        try {
            const x = await this.service.query(
                'select id, name, date_from, date_to from groups where groups.date_to is null or groups.date_to > now() order by date_from, name');
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
            if (!x) {
                return null;
            }
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

    async create(x: GroupType): Promise<GroupType> {
        try {
            const y = await this.service.createQueryBuilder("groups")
            .insert()
            .into(groups)
            .values({
                name: x.name,
                date_from: new Date()
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

    async update(id:number, x: GroupType): Promise<GroupType> {
        try {
            await this.service.createQueryBuilder("groups")
            .update(groups)
            .set({ 
                name: x.name
            })
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
