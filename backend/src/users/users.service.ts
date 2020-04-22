import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { User } from '../interfaces/user.interface';
import { users } from '../entity/Users';
import { students } from '../entity/Students';

@Injectable()
export class UsersService {

    constructor(
      @Inject('USER_REPOSITORY')
      private readonly service: Repository<users>,
      @Inject('STUDENT_REPOSITORY')
      private readonly students: Repository<students>,
  ) {}  

    async findGroupByUser(id: number): Promise<students> {
      try {
        const x = await this.students.createQueryBuilder("students")
        .where("students.user_id = :id and (students.deleted is null or students.deleted > now())", {id: id})
        .getOne();
        return x;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async createGroup(user_id: number, group_id: number): Promise<students> {
      try {
        await this.students.createQueryBuilder("students")
        .insert()
        .into(students)
        .values({
            user_id: user_id,
            group_id: group_id,
            created: new Date()
        })
        .execute();
        return await this.findGroupByUser(user_id);
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }
  

    async deleteGroup(id:number) {
      try {
        await this.students.createQueryBuilder("students")
        .update(students)
        .set({ 
           deleted: new Date()
         })
        .where("students.id = :id", {id: id})
        .execute();
    } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
      }
    }
  
    async findAll(): Promise<User[]> {
      try {
        const u = await this.service.createQueryBuilder("users")
        .where("users.deleted is null or users.deleted > now()")
        .getMany();
        let list: User[] = u.map(x => {
            let it = new User();
            it.id = x.id;
            it.roleId = x.role_id;
            it.fio = x.fio;
            it.username = x.login;
            it.email = x.email;
            it.created = x.created;
            it.deleted = x.deleted;
            return it;
        });
        for (let i = 0; i < list.length; i++) {
             let s = await this.findGroupByUser(list[i].id);
             if (s) {
                 list[i].group_id = s.group_id;
             }
        }
        return list;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async findOneByName(name: string): Promise<User> {
      try {
        const x = await this.service.createQueryBuilder("users")
        .where("users.login = :name", {name: name})
        .getOne();
        if (!x) {
          return null;
        }
        let it = new User();
        it.id = x.id;
        it.roleId = x.role_id;
        it.fio = x.fio;
        it.username = x.login;
        it.password = x.pass;
        it.email = x.email;
        it.created = x.created;
        it.deleted = x.deleted;
        let s = await this.findGroupByUser(it.id);
        if (s) {
            it.group_id = s.group_id;
        }
    return it;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error
        });
      }
    }

    async findOneById(id: number): Promise<User> {
      try {
        const x = await this.service.createQueryBuilder("users")
        .where("users.id = :id", {id: id})
        .getOne();
        if (!x) {
            return null;
        }
        let it = new User();
        it.id = x.id;
        it.roleId = x.role_id;
        it.fio = x.fio;
        it.username = x.login;
        it.email = x.email;
        it.created = x.created;
        it.deleted = x.deleted;
        let s = await this.findGroupByUser(it.id);
        if (s) {
            it.group_id = s.group_id;
        }
    return it;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

    async create(x: User): Promise<User> {
      try {
        const y = await this.service.createQueryBuilder("users")
        .insert()
        .into(users)
        .values({
            role_id: x.roleId,
            fio: x.fio,
            login: x.username,
            pass: x.password,
            email: x.email,
            created: new Date()
        })
        .returning('*')
        .execute();
        x.id = y.generatedMaps[0].id;
        if (x.group_id) {
            await this.createGroup(x.id, x.group_id);
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

    async update(id:number, x: User): Promise<User> {
      try {
        await this.service.createQueryBuilder("users")
        .update(users)
        .set({ 
          fio: x.fio,
          email: x.email,
          login: x.username
        })
        .where("users.id = :id", {id: id})
        .execute();
        if (x.password) {
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ 
            pass: x.password
          })
          .where("users.id = :id", {id: id})
          .execute();
        }
        let s = await this.findGroupByUser(id);
        if (x.group_id) {
            if (!s || (s.group_id != x.group_id)) {
                if (s) {
                    await this.deleteGroup(s.id);
                }
                await this.createGroup(id, x.group_id);
            }
        }
        return await this.findOneById(id);
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
      }
    }
  

    async delete(id:number): Promise<User> {
      try {
          await this.service.createQueryBuilder("users")
          .update(users)
          .set({ 
              deleted: new Date()
          })
          .where("users.id = :id", {id: id})
          .execute();
          return await this.findOneById(id);
      } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
      }
  }
  

}
