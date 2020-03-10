import { Module } from '@nestjs/common';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';
import { DatabaseModule } from '../database/database.module';
import { ruleProviders } from './rules.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...ruleProviders, RulesService],
  controllers: [RulesController]
})
export class RulesModule {}
