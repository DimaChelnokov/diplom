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

  async updateGrade(student:number, task: number, x: TaskGrade): Promise<TaskGrade> {
    try {
      await this.service.createQueryBuilder("task_grade")
      .update(task_grade)
      .set({ 
        grade_id: x.grade_id,
        note: x.note
      })
      .where("task_grade.student_id = :student_id and task_grade.task_id = :task_id", {student_id: student, task_id: task})
      .execute();
      x.student_id = student;
      x.task_id = task;
      return x;
    } catch (error) {
      console.error(error);
      throw new InternalServerErrorException({
          status: HttpStatus.BAD_REQUEST,
          error: error
      });
    }
  }
}
