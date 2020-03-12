import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { DatabaseModule } from '../database/database.module';
import { topicProviders } from './topics.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';

@Module({
  imports: [DatabaseModule],
  providers: [...topicProviders, ...usersProviders, ...logProviders, TopicsService, UsersService, LogService],
  controllers: [TopicsController]
})
export class TopicsModule {}
