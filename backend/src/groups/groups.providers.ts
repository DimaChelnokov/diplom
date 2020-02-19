import { Connection } from 'typeorm';
import { groups } from '../entity/Groups';

export const groupProviders = [
    {
      provide: 'GROUP_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(groups),
      inject: ['DATABASE_CONNECTION'],
    },
  ];