import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { User } from '../interfaces/user.interface';
import { users } from '../entity/Users';

@Injectable()
export class UsersService {

    constructor(
      @Inject('USER_REPOSITORY')
      private readonly service: Repository<users>,
    ) {}  

    async findAll(): Promise<User[]> {
      try {
        const u = await this.service.createQueryBuilder("users")
        .getMany();
        let list: User[] = u.map(x => {
            let item = new User();
            item.id = x.id;
            item.roleId = x.role_id;
            item.fio = x.fio;
            item.username = x.login;
            return item;
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

    async findOneByName(name: string): Promise<User> {
      try {
        const x = await this.service.createQueryBuilder("users")
        .where("users.login = :name", {name: name})
        .getOne();
        let it = new User();
        it.id = x.id;
        it.roleId = x.role_id;
        it.fio = x.fio;
        it.username = x.login;
        it.password = x.pass;
        return it;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: error
        });
      }
    }

    async findOneById(id: string): Promise<User> {
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
        return it;
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
      }
    }

}
