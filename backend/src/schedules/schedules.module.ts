import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { DatabaseModule } from '../database/database.module';
import { schedProviders } from './schedules.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';

@Module({
  imports: [DatabaseModule],
  providers: [...schedProviders, ...usersProviders, SchedulesService, UsersService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
