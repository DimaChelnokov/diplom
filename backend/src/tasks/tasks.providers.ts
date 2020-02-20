import { Connection } from 'typeorm';
import { tasks } from '../entity/Tasks';

export const taskProviders = [
    {
      provide: 'TASK_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(tasks),
      inject: ['DATABASE_CONNECTION'],
    },
  ];