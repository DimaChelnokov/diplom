import { Connection } from 'typeorm';
import { group_tasks } from '../entity/GroupTasks';

export const schedProviders = [
    {
      provide: 'SCHED_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(group_tasks),
      inject: ['DATABASE_CONNECTION'],
    },
  ];