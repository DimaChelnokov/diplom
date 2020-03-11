import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProviders } from './tasks.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders, ...usersProviders, TasksService, UsersService],
  controllers: [TasksController]
})
export class TasksModule {}
