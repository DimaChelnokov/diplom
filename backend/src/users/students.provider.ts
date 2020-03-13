import { Connection } from 'typeorm';
import { students } from '../entity/Students';

export const studentProviders = [
    {
      provide: 'STUDENT_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(students),
      inject: ['DATABASE_CONNECTION'],
    },
  ];