import { Injectable } from '@nestjs/common';
import {createConnection} from "typeorm";
import { GroupType } from '../interfaces/group.interface';
import { groups } from '../entity/Groups';

@Injectable()
export class GroupsService {

    async findAll(): Promise<GroupType[]> {
        try {
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
            }
          } catch (error) {
            console.error(error);
          }
    }

    async findOne(id: string): Promise<GroupType> {
        try {
            const connection = await createConnection();
            try {
                const l = await connection.getRepository(groups)
                .createQueryBuilder("groups")
                .where("groups.id = :id", {id: id})
                .getOne();
                let it = new GroupType();
                it.id = l.id.toString();
                it.name = l.name;
                it.created = l.date_from.toString();
                it.deleted = l.date_to.toString();
                connection.close();
                return it;
            } catch(error) {
                connection.close();
                console.error(error);
            }
          } catch (error) {
            console.error(error);
          }
    }

    async delete(id: string): Promise<GroupType> {
        try {
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
            }
          } catch (error) {
            console.error(error);
          }
    }
}
