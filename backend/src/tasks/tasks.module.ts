import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { DatabaseModule } from '../database/database.module';
import { taskProviders } from './tasks.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';
import { studentProviders } from '../users/students.provider';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders, ...usersProviders, ...studentProviders, ...logProviders, ...tokensProvider, TasksService, UsersService, LogService],
  controllers: [TasksController]
})
export class TasksModule {}
