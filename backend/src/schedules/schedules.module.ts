import { Module } from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { SchedulesController } from './schedules.controller';
import { DatabaseModule } from '../database/database.module';
import { schedProviders } from './schedules.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...schedProviders, SchedulesService],
  controllers: [SchedulesController]
})
export class SchedulesModule {}
