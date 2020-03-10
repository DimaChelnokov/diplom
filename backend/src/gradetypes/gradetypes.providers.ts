import { Connection } from 'typeorm';
import { grades } from '../entity/Grades';

export const gradetypeProviders = [
    {
      provide: 'GRADETYPE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(grades),
      inject: ['DATABASE_CONNECTION'],
    },
  ];