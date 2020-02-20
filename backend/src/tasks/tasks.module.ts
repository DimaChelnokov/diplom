import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProviders } from './tasks.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders, TasksService],
  controllers: [TasksController]
})
export class TasksModule {}
