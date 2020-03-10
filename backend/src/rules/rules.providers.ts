import { Connection } from 'typeorm';
import { grade_rules } from '../entity/GradeRules';

export const ruleProviders = [
    {
      provide: 'RULE_REPOSITORY',
      useFactory: (connection: Connection) => connection.getRepository(grade_rules),
      inject: ['DATABASE_CONNECTION'],
    },
  ];