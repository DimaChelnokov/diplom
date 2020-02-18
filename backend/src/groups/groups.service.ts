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

    async update(x: GroupType): Promise<GroupType> {
        try {
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
                    connection.close();
                    return r;
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
                    console.log(y);
                    r.id = y.generatedMaps[0].id.toString();
                    connection.close();
                    return r;
                }
            } catch (error) {
//                connection.close();
                console.error(error);
            }
//            connection.close();
//            return r;
        } catch (error) {
            console.error(error);
        }
    }
}
