import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { DatabaseModule } from '../database/database.module';
import { topicProviders } from './topics.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...topicProviders, ...usersProviders, TopicsService, UsersService],
  controllers: [TopicsController]
})
export class TopicsModule {}
