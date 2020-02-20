import { Connection } from 'typeorm';
import { task_topics } from '../entity/TaskTopics';

export const topicProviders = [
    {
      provide: 'TOPIC_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(task_topics),
      inject: ['DATABASE_CONNECTION'],
    },
  ];