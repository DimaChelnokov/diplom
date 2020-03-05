import { Connection } from 'typeorm';
import { users } from '../entity/Users';

export const usersProviders = [
    {
      provide: 'USER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(users),
      inject: ['DATABASE_CONNECTION'],
    },
  ];