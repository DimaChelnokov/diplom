import { Connection } from 'typeorm';
import { task_types } from '../entity/TaskTypes';

export const typeProviders = [
    {
      provide: 'TYPE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(task_types),
      inject: ['DATABASE_CONNECTION'],
    },
  ];