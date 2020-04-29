import { Connection } from 'typeorm';
import { answer } from '../entity/Answer';

export const answerProviders = [
    {
      provide: 'ANSWER_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(answer),
      inject: ['DATABASE_CONNECTION'],
    },
  ];