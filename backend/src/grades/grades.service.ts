import { Injectable } from '@nestjs/common';
import {createConnection} from "typeorm";
import { GradeType } from '../interfaces/grade.interface';
import { grades } from '../entity/Grades';

@Injectable()
export class GradesService {
    async findAll(): Promise<GradeType[]> {
      try {
        const connection = await createConnection();
        try {
          const u = await connection.manager.find(grades);
          let list: GradeType[] = u.map(x => {
              let it = new GradeType();
              it.id = x.id.toString();
              it.type_id = x.type_id.toString();
              it.name = x.name;
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
}
