import { Module } from '@nestjs/common';
import { GradesService } from './grades.service';
import { GradesController } from './grades.controller';
import { DatabaseModule } from '../database/database.module';
import { gradeProviders } from './grades.providers';
import { usersProviders } from '../users/users.providers';
import { UsersService } from '../users/users.service';
import { logProviders } from '../log/log.providers';
import { LogService } from '../log/log.service';
import { studentProviders } from '../users/students.provider';
import { tokensProvider } from '../users/tokens.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...gradeProviders, ...usersProviders, ...studentProviders, ...logProviders, ...tokensProvider, GradesService, UsersService, LogService],
  controllers: [GradesController]
})
export class GradesModule {}
