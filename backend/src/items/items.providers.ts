import { Connection } from 'typeorm';
import { task_items } from '../entity/TaskItems';

export const itemProviders = [
    {
      provide: 'ITEM_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(task_items),
      inject: ['DATABASE_CONNECTION'],
    },
  ];