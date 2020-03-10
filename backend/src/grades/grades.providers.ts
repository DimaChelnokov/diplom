import { Connection } from 'typeorm';
import { task_grade } from '../entity/TaskGrade';

export const gradeProviders = [
    {
      provide: 'GRADE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(task_grade),
      inject: ['DATABASE_CONNECTION'],
    },
  ];