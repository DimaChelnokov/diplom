import { Connection } from 'typeorm';
import { grades } from '../entity/Grades';

export const gradeProviders = [
    {
      provide: 'GRADE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(grades),
      inject: ['DATABASE_CONNECTION'],
    },
  ];