import { Connection } from 'typeorm';
import { task_templates } from '../entity/TaskTemplates';

export const templateProviders = [
    {
      provide: 'TEMPLATE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(task_templates),
      inject: ['DATABASE_CONNECTION'],
    },
  ];