import { Connection } from 'typeorm';
import { item_types } from '../entity/ItemTypes';

export const itemtypeProviders = [
    {
      provide: 'ITEMTYPE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(item_types),
      inject: ['DATABASE_CONNECTION'],
    },
  ];