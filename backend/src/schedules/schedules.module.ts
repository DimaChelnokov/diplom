import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { DatabaseModule } from '../database/database.module';
import { schedProviders } from './schedules.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';
import { studentProviders } from '../users/students.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...schedProviders, ...usersProviders, ...studentProviders, ...logProviders, SchedulesService, UsersService, LogService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
