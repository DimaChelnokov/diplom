import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { DatabaseModule } from '../database/database.module';
import { ruleProviders } from './rules.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';
import { studentProviders } from '../users/students.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...ruleProviders, ...usersProviders, ...studentProviders, ...logProviders, RulesService, UsersService, LogService],
  controllers: [RulesController]
})
export class RulesModule {}