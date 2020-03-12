import { Connection } from 'typeorm';
import { user_log } from '../entity/UserLog';

export const logProviders = [
    {
      provide: 'LOG_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(user_log),
      inject: ['DATABASE_CONNECTION'],
    },
  ];