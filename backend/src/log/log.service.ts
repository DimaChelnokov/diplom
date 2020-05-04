import { Injectable, Inject, InternalServerErrorException, HttpStatus } from '@nestjs/common';
import { user_log } from '../entity/UserLog';
import { Repository } from 'typeorm';
import { UserLog } from '../interfaces/log.interface';
import { picture } from '../entity/Picture';

@Injectable()
export class LogService {

    constructor(
        @Inject('LOG_REPOSITORY')
        private readonly service: Repository<user_log>,
      ) {}  
    
      async findAll(): Promise<UserLog[]> {
        try {
          const u = await this.service.find();
          let r: UserLog[] = u.map(x => {
            let it = new UserLog();
            it.event_date = x.event_date;
            it.user_id = x.user_id;
            it.event_id = x.event_id;
            it.type_id = x.type_id;
            it.url = x.url;
            it.body = JSON.parse(x.body);
            it.result_code = x.result_code;
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

      async create(user_id: number, event_id: number, type_id: number, url: string, body: any, rc: number): Promise<UserLog> {
        try {
          let it = new UserLog();
          it.user_id = user_id;
          it.event_date = new Date();
          it.event_id = event_id;
          it.type_id = type_id;
          it.url = url;
          it.body = JSON.parse(JSON.stringify(body));
          it.result_code = rc;
          const y = await this.service.createQueryBuilder("user_log")
          .insert()
          .into(user_log)
          .values({
              user_id: it.user_id,
              event_date: it.event_date,
              event_id: it.event_id,
              type_id: it.type_id,
              url: it.url,
              body: JSON.stringify(it.body),
              result_code: it.result_code
          })
          .returning('*')
          .execute();
          return it;
        } catch (error) {
          console.error(error);
          throw new InternalServerErrorException({
              status: HttpStatus.BAD_REQUEST,
              error: error
          });
        }
      }

      async addFile(file: any): Promise<boolean> {
        try {
          await this.service.createQueryBuilder("picture")
          .insert()
          .into(picture)
          .values({
              file_name: file.originalname,
              internal_name: file.filename,
              loaded: new Date()
          })
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
}
