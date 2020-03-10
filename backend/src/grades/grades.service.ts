import { Injectable, InternalServerErrorException, HttpStatus, Inject } from '@nestjs/common';
import { Repository} from "typeorm";
import { task_grade } from '../entity/TaskGrade';
import { TaskGrade } from '../interfaces/taskgrade.interface';

@Injectable()
export class GradesService {

  constructor(
    @Inject('GRADE_REPOSITORY')
    private readonly service: Repository<task_grade>,
  ) {}  

  async findAll(): Promise<TaskGrade[]> {
    try {
      const u = await this.service.find();
      let r: TaskGrade[] = u.map(x => {
        let it = new TaskGrade();
        it.id = x.id;
        it.student_id = x.student_id;
        it.task_id = x.task_id;
        it.grade_id = x.grade_id;
        it.kind_id = x.kind_id;
        it.user_id = x.graded_by;
        it.notes = x.note;
        it.changed = x.changed;
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

  async findOne(id: number): Promise<TaskGrade> {
    try {
        const x = await this.service.createQueryBuilder("task_grade")
        .where("task_grade.id = :id", {id: id})
        .getOne();
        let it = new TaskGrade();
        it.id = x.id;
        it.student_id = x.student_id;
        it.task_id = x.task_id;
        it.grade_id = x.grade_id;
        it.kind_id = x.kind_id;
        it.user_id = x.graded_by;
        it.notes = x.note;
        it.changed = x.changed;
        return it;
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
    }
}

async create(x: TaskGrade, user: any): Promise<TaskGrade> {
    try {
      const y = await this.service.createQueryBuilder("task_grade")
      .insert()
      .into(task_grade)
      .values({
          student_id: x.student_id,
          task_id: x.task_id,
          grade_id: x.grade_id,
          kind_id: x.kind_id,
          graded_by: user.userId,
          note: x.notes,
          changed: new Date()
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

  async update(id:number, x: TaskGrade, user: any): Promise<TaskGrade> {
    try {
        if (x.id) {
            const r = await this.service.findOne(x.id);
            await this.service.createQueryBuilder("task_grade")
            .update(task_grade)
            .set({ 
              grade_id: x.grade_id
            })
            .where("task_grade.id = :id and task_grade.graded_by = :user_id", {id: id, user_id: user.userId})
            .execute();
        }
        return await this.findOne(id);
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
    }
  }

  async delete(id: number, user: any) {
    try {
        await this.service.createQueryBuilder("task_grade")
        .delete()
        .from(task_grade)
        .where("task_grade.id = :id and task_grade.graded_by = :user_id", {id: id, user_id: user.userId})
        .execute();
    } catch (error) {
        console.error(error);
        throw new InternalServerErrorException({
            status: HttpStatus.BAD_REQUEST,
            error: error
        });
    }
  }
}
