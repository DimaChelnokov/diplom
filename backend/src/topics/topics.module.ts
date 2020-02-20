import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { DatabaseModule } from '../database/database.module';
import { topicProviders } from './topics.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...topicProviders, TopicsService],
  controllers: [TopicsController]
})
export class TopicsModule {}
