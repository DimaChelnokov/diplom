import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { DatabaseModule } from '../database/database.module';
import { ruleProviders } from './rules.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...ruleProviders, ...usersProviders, RulesService, UsersService],
  controllers: [RulesController]
})
export class RulesModule {}
